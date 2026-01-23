const fs = require("fs");

const KAKAO_REST_API_KEY = "f0a7c5749ec9d3be081afbaed798d651";
const INPUT_FILE = "./korea_districts.json";
const OUTPUT_FILE = "./koreaDistricts.ts";
const PROGRESS_FILE = "./progress.json"; // 중간 저장용

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getCoordinates(address, retries = 3) {
  const query = address.replace(/-/g, " ");
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      });

      const data = await response.json();

      if (data.documents && data.documents.length > 0) {
        const { x, y } = data.documents[0];
        return { lat: parseFloat(y), lon: parseFloat(x) };
      }
      return null;
    } catch (err) {
      console.log(`재시도 ${attempt + 1}/${retries}: ${address}`);
      await delay(2000);
    }
  }
  return null;
}

async function main() {
  const raw = fs.readFileSync(INPUT_FILE, "utf-8");
  const districts = JSON.parse(raw);

  // 이전 진행 상황 불러오기
  let results = [];
  let startIndex = 0;

  if (fs.existsSync(PROGRESS_FILE)) {
    const progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
    results = progress.results;
    startIndex = progress.lastIndex + 1;
    console.log(`이전 진행 상황 복원: ${startIndex}부터 재개`);
  }

  let success = results.length;
  let fail = 0;

  for (let i = startIndex; i < districts.length; i++) {
    const name = districts[i];
    const coords = await getCoordinates(name);

    if (coords) {
      results.push({
        id: name.replace(/\s/g, "-").toLowerCase(),
        name: name.split("-").pop(),
        fullName: name.replace(/-/g, " "),
        lat: coords.lat,
        lon: coords.lon,
      });
      success++;
    } else {
      console.log(`좌표 없음: ${name}`);
      fail++;
    }

    // 100개마다 중간 저장
    if (i % 100 === 0) {
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ results, lastIndex: i }), "utf-8");
      console.log(`진행: ${i + 1}/${districts.length} (저장됨)`);
    }

    // API 속도 제한 방지
  }

  // TS 파일로 출력
  const tsContent = `export interface District {
  id: string;
  name: string;
  fullName: string;
  lat: number;
  lon: number;
}

export const districts: District[] = ${JSON.stringify(results, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, tsContent, "utf-8");

  // 완료 후 progress 파일 삭제
  if (fs.existsSync(PROGRESS_FILE)) {
    fs.unlinkSync(PROGRESS_FILE);
  }

  console.log(`완료! 성공: ${success}, 실패: ${fail}`);
  console.log(`저장 위치: ${OUTPUT_FILE}`);
}

main();
