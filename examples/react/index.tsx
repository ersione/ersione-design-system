import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Navigation, NavigationLink, DataHighlight, HighlightPanel, Accordion, Alert, Badge, Button, Card, Checkbox, Dialog, Input, Metric, MetricPanel, Pagination, Progress, Radio, Select, Skeleton, Switch, Table, TableContainer, Tabs, Textarea, Toast } from "../../src/react/index.js";

import { observeChartTheme, type ChartTheme } from "../../src/react/chart-theme.js";

function SharedDataExample() {
  const ref = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<ChartTheme | null>(null);
  const [updates, setUpdates] = useState(0);
  useEffect(() => ref.current ? observeChartTheme(ref.current, theme => { setTheme(theme); setUpdates(value => value + 1); }) : undefined, []);
  return <div ref={ref} data-theme-observer data-theme-updates={updates}>
    <Navigation aria-label="공통 메뉴 예시"><NavigationLink href="#overview" active icon={<svg viewBox="0 0 20 20"><path d="M3 15L8 8L12 11L17 4" fill="none" stroke="currentColor" strokeWidth="2"/></svg>}>개요</NavigationLink><NavigationLink href="#charts">월별 추이</NavigationLink></Navigation>
    <HighlightPanel style={{marginTop:16}}><h3>핵심 수치 · 가상 데이터</h3><div className="row"><DataHighlight tone="blue" size="lg" unit="명" secondary="+31.7%">+83</DataHighlight><DataHighlight tone="teal">-0.6%</DataHighlight><DataHighlight tone="teal" unit="명">156</DataHighlight><DataHighlight tone="amber" unit="명">72</DataHighlight><DataHighlight muted>비교 자료 없음</DataHighlight></div></HighlightPanel>
    <svg role="img" aria-label="공통 차트 색상 예시" viewBox="0 0 600 150" style={{width:'100%',marginTop:20}}>
      {[30,70,110].map(y=><path key={y} d={`M20 ${y}H580`} stroke="var(--chart-grid)"/>)}
      <path d="M20 110L130 90L240 100L350 50L460 65L580 20" stroke="var(--palette-blue)" strokeWidth="2" fill="none"/>
      <path d="M20 130L130 100L240 120L350 85L460 100L580 70" stroke="var(--palette-teal)" strokeWidth="2" strokeDasharray="6 4" fill="none"/>
    </svg>
    <div className="row">{theme?.series.map((color,index)=><span key={index} data-chart-series={index} style={{color}}>● 시리즈 {index+1}</span>)}</div>
    <span data-chart-theme>{theme?.palette.blue}</span>
  </div>;
}

function Playground() {
  const [brand, setBrand] = useState("blue");
  const [dark, setDark] = useState(false);
  const dialogInput = useRef<HTMLInputElement>(null);
  const [dialog, setDialog] = useState(false);
  const [toast, setToast] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  function theme(nextBrand: string, nextDark: boolean) { setBrand(nextBrand); setDark(nextDark); document.body.dataset.brand = nextBrand; document.body.dataset.dark = String(nextDark); }
  return <main>
    <header className="toolbar"><div className="brand"><img src="../../assets/favicon.svg" alt="Ersione"/><div><span className="eyebrow">ERSIONE DESIGN SYSTEM / V0.3</span><h1>같은 기반, 다양한 쓰임.</h1></div></div><div className="row"><Select aria-label="브랜드 테마" value={brand} onChange={e=>theme(e.target.value,dark)}><option value="blue">블루</option><option value="orange">오렌지</option></Select><label className="checklabel"><Switch checked={dark} onChange={e=>theme(brand,e.target.checked)}/>다크 모드</label></div></header>
    <p className="intro">실제 패키지 소스로 렌더링한 React 컴포넌트입니다. 크기, 상태, 키보드 동작과 네 가지 테마를 비교하세요.</p>
    <div className="grid">
      <Card className="wide"><h2>버튼 · 크기와 강조 수준</h2><div className="sizes">{(["sm","md","lg"] as const).map(size=><div key={size}><p className="hint">{size.toUpperCase()} · {size==='sm'?32:size==='md'?40:48}px</p><div className="row"><Button size={size} onClick={()=>setToast(true)}>저장하기</Button><Button size={size} variant="secondary" onClick={()=>setToast(true)}>취소</Button><Button size={size} variant="ghost" onClick={()=>setToast(true)}>더 보기</Button></div></div>)}</div><h3>상태 · 위험 동작</h3><div className="row"><Button variant="danger" onClick={()=>setDialog(true)}>삭제 확인</Button><Button disabled>비활성</Button><Button loading>처리 중</Button><Button variant="secondary" loading={loading} onClick={()=>setLoading(true)}>{loading?'제출 중':'제출 상태 확인'}</Button><Button variant="ghost" onClick={()=>setLoading(false)}>상태 초기화</Button></div></Card>
      <Card><h2>입력 · 크기와 오류</h2><div className="stack">{(["sm","md","lg"] as const).map(size=><label className="field" key={size}>회사명 {size.toUpperCase()}<Input controlSize={size} placeholder="회사명을 입력하세요" /></label>)}<label className="field">이메일 (필수)<Input type="email" required aria-invalid aria-describedby="email-error" defaultValue="example"/></label><p className="error" id="email-error">이메일 주소 형식을 확인해 주세요.</p><label className="field">수정할 수 없는 값<Input disabled defaultValue="비활성 입력" /></label><label className="field">설명<Textarea placeholder="프로젝트를 설명해 주세요" /></label></div></Card>
      <Card><h2>선택 · 네이티브 폼 동작</h2><div className="stack"><label className="field">지역<Select defaultValue="seoul"><option value="">지역을 선택하세요</option><option value="seoul">서울</option><option value="busan">부산</option><option disabled>보관됨 · 선택 불가</option></Select></label><label className="field">오류 상태<Select aria-invalid aria-describedby="select-error"><option>환경을 선택하세요</option></Select></label><p id="select-error" className="error">배포 환경을 선택해 주세요.</p><label className="field">비활성<Select disabled><option>선택할 수 없어요</option></Select></label><label className="checklabel"><Checkbox defaultChecked/>이메일 알림 받기</label><label className="checklabel"><Checkbox disabled defaultChecked/>비활성 체크</label><fieldset><legend>공개 범위</legend><label className="checklabel"><Radio name="visibility" value="private" defaultChecked/>나만 보기</label><label className="checklabel"><Radio name="visibility" value="public"/>공개</label><label className="checklabel"><Radio name="visibility" disabled/>비활성</label></fieldset><label className="checklabel"><Switch defaultChecked/>자동 업데이트</label><label className="checklabel"><Switch disabled defaultChecked/>비활성 스위치</label></div></Card>
      <Card className="wide"><h2>공통 메뉴 · 하이라이트 · 차트</h2><SharedDataExample/></Card>
      <Card className="wide"><h2>데이터 · 공통 지표 패널</h2><MetricPanel aria-label="가상 데이터 요약"><Metric label="추정 평균 연봉" value="5,240" unit="만원" tone="salary" description="가상 데이터 · 실제 급여 아님"/><Metric label="서비스 이용자" value="1,280" unit="명" tone="people" description="규모는 블루 계열"/><Metric label="월간 순증" value="+48" unit="명" tone="flow" description="증가와 성공은 다른 의미"/></MetricPanel></Card>
      <Card><h2>상태 · 배지와 알림</h2><div className="row">{(["neutral","success","warning","error"] as const).map((tone,i)=><Badge tone={tone} key={tone}>{['정보','정상','확인 필요','오류'][i]}</Badge>)}</div><div className="stack" style={{marginTop:24}}><Alert tone="success" heading="저장했어요">변경 사항이 적용되었습니다.</Alert><Alert tone="warning" heading="확인이 필요해요">공개 전 내용을 확인해 주세요.</Alert><Alert tone="error" heading="연결하지 못했어요">잠시 후 다시 시도해 주세요.</Alert><Alert heading="새로운 업데이트">자세한 내용을 확인하세요.</Alert></div></Card>
      <Card><h2>탭 · 모달 · 토스트</h2><Tabs label="프로젝트 정보" items={[{value:'overview',label:'개요',content:'프로젝트 개요를 살펴보세요.'},{value:'disabled',label:'비활성',disabled:true,content:'숨긴 콘텐츠'},{value:'activity',label:'활동',content:'최근 업데이트 기록입니다.'},{value:'settings',label:'설정',content:'프로젝트 설정을 확인하세요.'}]}/><div className="row"><Button onClick={()=>setDialog(true)}>모달 열기</Button><Button variant="secondary" onClick={()=>setToast(true)}>토스트 알림</Button></div><h3>아코디언</h3><Accordion heading="테마는 어떻게 적용되나요?" open><p>동일한 토큰으로 블루·오렌지와 라이트·다크를 지원합니다.</p></Accordion><Accordion heading="서비스별로 확장할 수 있나요?"><p>도메인 로직은 서비스에 두고 공통 스타일을 가져옵니다.</p></Accordion></Card>
      <Card><h2>진행률 · 로딩</h2><div className="stack"><Progress label="동기화 진행률" max={100} value={68} valueText="68%"/><Progress label="처리 중"/><div className="skeletons" aria-busy="true" aria-label="자료 불러오는 중"><Skeleton/><Skeleton style={{width:'80%'}}/><Skeleton style={{width:'55%'}}/></div></div></Card>
      <Card><h2>페이지 이동 · 경계</h2><Pagination page={page} totalPages={3} onPageChange={setPage}/><h3>표면 · 패딩</h3><div className="row"><Card padding="sm">작은 패딩 16px</Card><Card padding="md">기본 패딩 24px</Card><Card padding="lg">넓은 패딩 32px</Card></div></Card>
      <Card className="wide"><h2>표 · 숫자 정렬과 가로 스크롤</h2><TableContainer role="region" aria-label="가상 회사 목록" tabIndex={0}><Table><caption>가상 데이터 예시</caption><thead><tr><th scope="col">회사명</th><th scope="col">상태</th><th scope="col" data-numeric>가입자 수</th><th scope="col" data-numeric>추정 연봉</th></tr></thead><tbody><tr><th scope="row">한빛테크</th><td><Badge tone="success">운영 중</Badge></td><td data-numeric>1,280명</td><td data-numeric>5,240만원</td></tr><tr><th scope="row">라온미디어</th><td><Badge tone="warning">과거 자료</Badge></td><td data-numeric>236명</td><td data-numeric>4,820만원</td></tr></tbody></Table></TableContainer></Card>
    </div>
    <Dialog initialFocusRef={dialogInput} open={dialog} onOpenChange={setDialog} heading="변경 사항을 확인하세요" description="Escape로 닫을 수 있습니다. 닫으면 열었던 버튼으로 포커스가 돌아갑니다."><label className="field">프로젝트 이름<Input ref={dialogInput} defaultValue="Ersione Workspace"/></label><div className="row" style={{marginTop:24}}><Button onClick={()=>{setDialog(false);setToast(true);}}>저장</Button><Button variant="secondary" onClick={()=>setDialog(false)}>취소</Button></div></Dialog>
    <Toast open={toast} onDismiss={()=>setToast(false)}>변경 사항을 저장했어요.</Toast>
    <footer>React 컴포넌트 20개 계열 + TableContainer · Vue 래퍼와 바닐라 JS 컨트롤러는 후속 범위입니다.</footer>
  </main>;
}
createRoot(document.getElementById('root')!).render(<Playground/>);
