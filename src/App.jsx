import React, { useState, useEffect } from 'react';
import { 
  Activity, Brain, Gamepad2, Heart, AlertTriangle, GitFork, 
  MessageSquare, Bookmark, Clock, Target, Info, Award, 
  FileText, Calendar, GitBranch, User, Download, ClipboardList, 
  Briefcase, X, LogIn, Plus, Home, ChevronLeft, Save, Tv, PenTool, CheckCircle, Loader2, Filter, Layers, Dices, Tag, Search, Puzzle
} from 'lucide-react';

// --- モックデータセット (8つ: レトロゲーム + カタン) ---
const mockDB = [
  {
    id: 'game-01',
    category: 'game',
    title: "スーパーマリオブラザーズ",
    platform: "FC / Switch",
    genre: "アクション",
    playTime: "10分〜",
    players: "1人",
    isCertified: true,
    version: "1.2",
    lastUpdated: "2025.10.15",
    evidenceLevel: "Level 4 (Expert Opinion)",
    contributor: { name: "Kazuya Ito", rank: "Level 2 Supervisor", color: "bg-indigo-500" },
    tags: [
      { label: "b140 注意機能", type: "icf" },
      { label: "b147 精神運動機能", type: "icf" },
      { label: "自己効力感", type: "psych" },
      { label: "タイミング制御", type: "motor" },
      { label: "失敗受容", type: "psych" }
    ],
    stats: { visual: 3, audio: 4, motor: 4, cognitive: 3, social: 2 },
    redFlags: ["ジャンプ失敗時の衝動性", "BGM反復による聴覚過敏", "点滅刺激"],
    translation: {
      title: "なぜ「マリオ」がリハビリになるのか？",
      content: "「説明書のないチュートリアル」として完成されており、言語的理解が低下している患者に対しても、視覚と聴覚のフィードバックのみで課題を提示できる。即時フィードバックにより内部モデルの修正が容易。",
      key: "即時フィードバックループ"
    },
    protocol: {
      title: "World 1-1 導入プロトコル",
      time: "15min",
      steps: [
        { title: "Step 1: グリップと操作確認", desc: "コントローラー保持評価。片麻痺時は固定等の環境調整。" },
        { title: "Step 2: 最初のクリボーまで", desc: "失敗受容プロセスの観察。衝動性の評価。" },
        { title: "Step 3: 土管を超える", desc: "二重課題（Dual Task）の評価。成功体験として終了。" }
      ]
    }
  },
  {
    id: 'game-03',
    category: 'game',
    title: "テトリス (TETRIS)",
    platform: "GB / Switch / PC",
    genre: "パズル",
    playTime: "5分〜",
    players: "1人",
    isCertified: true,
    version: "3.0",
    lastUpdated: "2025.09.01",
    evidenceLevel: "Level 2 (RCT)",
    contributor: { name: "Dr_Pazzle", rank: "Level 3 Instructor", color: "bg-blue-600" },
    tags: [
      { label: "b164 高次認知機能", type: "icf" },
      { label: "空間認知", type: "cognitive" },
      { label: "侵入思考の抑制", type: "psych" },
      { label: "フロー体験", type: "psych" }
    ],
    stats: { visual: 5, audio: 2, motor: 3, cognitive: 5, social: 1 },
    redFlags: ["テトリス効果（残像）による不眠", "ゲームスピード上昇時の焦燥感"],
    translation: {
      title: "「PTSD予防」と視空間ワーキングメモリ",
      content: "視空間的な課題に没頭することで、トラウマ的な記憶の再体験（フラッシュバック）に必要な認知リソースを競合的に奪い、侵入思考を低減させる効果（いわゆる「テトリス効果」）が研究されている。",
      key: "認知リソースの競合的占有"
    },
    protocol: {
      title: "不安軽減のための没入セッション",
      time: "20min",
      steps: [
        { title: "Step 1: レベル設定", desc: "「考えなくても操作できるが、気を抜くとミスする」絶妙な速度に調整する。" },
        { title: "Step 2: 10分間プレイ", desc: "スコアは気にせず、ブロックを隙間なく埋めることだけに集中させる。" },
        { title: "Step 3: クールダウン", desc: "画面から目を離し、深呼吸をして現実に意識を戻す。" }
      ]
    }
  },
  {
    id: 'game-04',
    category: 'game',
    title: "ドラゴンクエストIII",
    platform: "FC / Switch",
    genre: "RPG",
    playTime: "30分〜",
    players: "1人",
    isCertified: true,
    version: "1.1",
    lastUpdated: "2025.11.20",
    evidenceLevel: "Level 4 (Expert Opinion)",
    contributor: { name: "Kazuya Ito", rank: "Level 2 Supervisor", color: "bg-indigo-500" },
    tags: [
      { label: "b144 記憶機能", type: "icf" },
      { label: "遂行機能", type: "cognitive" },
      { label: "役割取得", type: "social" },
      { label: "代理受傷からの回復", type: "psych" }
    ],
    stats: { visual: 3, audio: 5, motor: 1, cognitive: 4, social: 3 },
    redFlags: ["セーブデータ消失への不安", "長時間プレイによる疲労"],
    translation: {
      title: "「人生の縮図」としてのロールプレイ",
      content: "職業選択（役割）とパーティ編成（社会）は、現実社会の縮図である。自身の分身である勇者に名前をつけ、困難を乗り越える物語を追体験することは、ナラティブ・セラピー的な自己物語の再構築に寄与する。",
      key: "英雄の旅（ヒーローズ・ジャーニー）"
    },
    protocol: {
      title: "ルイーダの酒場：自己理解ワーク",
      time: "45min",
      steps: [
        { title: "Step 1: 職業選択", desc: "「もし自分が冒険に出るならどの職業？」を選ばせ、その理由から自己像を探る。" },
        { title: "Step 2: 名前入力", desc: "キャラクターに自分や知人の名前をつけるか、全くの別名にするかで心理的距離を測る。" },
        { title: "Step 3: 性格診断", desc: "オープニングの性格診断を行い、結果についてどう感じるか話し合う。" }
      ]
    }
  },
  {
    id: 'anime-01',
    category: 'anime',
    title: "葬送のフリーレン",
    platform: "配信 / Blu-ray",
    genre: "ファンタジー / ドラマ",
    playTime: "24分(1話)",
    players: "-",
    isCertified: false,
    version: "1.0",
    lastUpdated: "2025.11.02",
    evidenceLevel: "Level 5 (Idea)",
    contributor: { name: "OT_Sato", rank: "Level 1 Practitioner", color: "bg-green-500" },
    tags: [
      { label: "b114 自身の情動", type: "icf" },
      { label: "喪失と受容", type: "psych" },
      { label: "時間的展望", type: "psych" },
      { label: "ナラティブ", type: "psych" }
    ],
    stats: { visual: 4, audio: 3, motor: 1, cognitive: 4, social: 3 },
    redFlags: ["死別の想起による抑うつ", "特定の回想シーンへの固執"],
    translation: {
      title: "「時間のズレ」を治療的メタファーに",
      content: "主人公のエルフと人間の「時間感覚の違い」をテーマにすることで、高次脳機能障害や認知症を持つ患者の『周囲と感覚が合わない』という孤独感に寄り添うメタファーとして活用できる。",
      key: "共感性の外部化"
    },
    protocol: {
      title: "第1話鑑賞と感想シェア",
      time: "40min",
      steps: [
        { title: "Step 1: 導入（5分）", desc: "「昔の仲間との再会」というテーマを提示し、安心できる環境を作る。" },
        { title: "Step 2: 鑑賞（25分）", desc: "第1話『冒険の終わり』を鑑賞。途中で止めて確認を入れても良い。" },
        { title: "Step 3: 共有（10分）", desc: "「フリーレンはなぜ泣かなかったのか？」等の問いかけで感情の言語化を促す。" }
      ]
    }
  },
  {
    id: 'plamo-01',
    category: 'plamo',
    title: "HGUC RX-78-2 ガンダム",
    platform: "プラモデル",
    genre: "模型",
    playTime: "60分〜",
    players: "1人",
    isCertified: true,
    version: "2.1",
    lastUpdated: "2025.09.10",
    evidenceLevel: "Level 3 (Case Series)",
    contributor: { name: "Gunpla_Meister", rank: "Level 3 Instructor", color: "bg-red-500" },
    tags: [
      { label: "b147 精神運動機能", type: "icf" },
      { label: "d210 動作の遂行", type: "icf" },
      { label: "構成障害", type: "motor" },
      { label: "工程理解", type: "cognitive" }
    ],
    stats: { visual: 5, audio: 1, motor: 5, cognitive: 4, social: 1 },
    redFlags: ["ニッパーによる受傷リスク", "微細パーツの紛失・誤飲", "完成への固執による疲労"],
    translation: {
      title: "構成障害への構造化アプローチ",
      content: "説明書（視覚的指示）とパーツ（立体的対象物）のマッチング作業は、構成障害のリハビリテーションとして極めて有用。スナップフィットのため接着剤不要で、失敗時の修正（やり直し）が可能である点が臨床向き。",
      key: "工程の分解と再構築"
    },
    protocol: {
      title: "上肢機能訓練としての素組み",
      time: "45min",
      steps: [
        { title: "Step 1: パーツの切り出し", desc: "ニッパー操作による把持力・巧緻性訓練。パーツ探索による注意機能訓練。" },
        { title: "Step 2: ゲート処理（省略可）", desc: "難易度調整可能。ヤスリがけを行う場合は感覚入力（触圧覚）へのアプローチとなる。" },
        { title: "Step 3: スナップフィット", desc: "両手協調動作によるはめ込み。カチッという音による聴覚フィードバックの確認。" }
      ]
    }
  },
  {
    id: 'trpg-01',
    category: 'trpg',
    title: "クトゥルフ神話TRPG (CoC)",
    platform: "TRPG / 書籍",
    genre: "ホラー / 会話型RPG",
    playTime: "30分〜(短縮版)",
    players: "2〜4人",
    isCertified: true,
    version: "1.5",
    lastUpdated: "2025.10.30",
    evidenceLevel: "Level 4 (Expert Opinion)",
    contributor: { name: "GameMaster_T", rank: "Level 2 Supervisor", color: "bg-purple-500" },
    tags: [
      { label: "d710 基礎的な対人関係", type: "icf" },
      { label: "d720 複雑な対人関係", type: "icf" },
      { label: "役割演技 (Roleplay)", type: "psych" },
      { label: "協力行動", type: "social" }
    ],
    stats: { visual: 2, audio: 4, motor: 1, cognitive: 5, social: 5 },
    redFlags: ["ホラー表現による不安増大", "現実検討識の低下", "ゲーム内失敗の過剰な自己帰属"],
    translation: {
      title: "安全な枠組みでの「恐怖」の共有",
      content: "架空の恐怖的状況（サンチェック）を他者と共有し、協力して解決策を探るプロセスは、SST（ソーシャルスキルトレーニング）の高度な応用となる。ダイスによるランダム性が、失敗の責任を「運」に転嫁できるため、失敗恐怖の軽減に役立つ。",
      key: "失敗の外部化と共同注意"
    },
    protocol: {
      title: "ショートシナリオを用いたSST",
      time: "60min",
      steps: [
        { title: "Step 1: キャラクター作成（15分）", desc: "「自分とは違う誰か」になることで、自己開示の抵抗感を下げる。" },
        { title: "Step 2: 探索パート（30分）", desc: "情報共有をしないとクリアできない場面を用意し、必然的なコミュニケーションを促す。" },
        { title: "Step 3: 感想戦（15分）", desc: "「あの時どうすれば良かったか」をPL視点で客観的に振り返る。" }
      ]
    }
  },
  {
    id: 'game-02',
    category: 'game',
    title: "ポケットモンスター S/V",
    platform: "Switch",
    genre: "RPG",
    playTime: "30分〜",
    players: "1〜4人",
    isCertified: false,
    version: "1.0",
    lastUpdated: "2025.11.10",
    evidenceLevel: "Level 5 (Idea)",
    contributor: { name: "Poke_Rehab", rank: "Level 1 Practitioner", color: "bg-orange-500" },
    tags: [
      { label: "b140 注意機能", type: "icf" },
      { label: "d920 レクリエーション", type: "icf" },
      { label: "収集行動", type: "psych" },
      { label: "自律性", type: "psych" }
    ],
    stats: { visual: 4, audio: 3, motor: 2, cognitive: 3, social: 4 },
    redFlags: ["長時間の没頭", "対戦での勝ち負けへの固執"],
    translation: {
      title: "「収集」と「交換」による社会参加",
      content: "図鑑完成という明確な目標に向けた収集行動（Collection）は、達成感を得やすい。また、バージョンによる出現ポケモンの違いは、他者との「交換」を必然化し、自然なコミュニケーションのきっかけとなる。",
      key: "役割分担と互恵的関係"
    },
    protocol: {
      title: "図鑑埋め協力プレイ",
      time: "40min",
      steps: [
        { title: "Step 1: 目標設定", desc: "「今日はこのエリアのポケモンを捕まえる」と宣言し、見通しを持つ。" },
        { title: "Step 2: 探索・捕獲", desc: "オープンワールドでの自由な探索により、自律性を促す。" },
        { title: "Step 3: 交換会", desc: "互いに足りないポケモンを交換し、「ありがとう」を言い合う経験を作る。" }
      ]
    }
  },
  {
    id: 'boardgame-01',
    category: 'boardgame',
    title: "カタン (Catan)",
    platform: "ボードゲーム",
    genre: "交渉 / 資源管理",
    playTime: "60分",
    players: "3〜4人",
    isCertified: true,
    version: "2.0",
    lastUpdated: "2025.08.20",
    evidenceLevel: "Level 4 (Expert Opinion)",
    contributor: { name: "BoardGame_OT", rank: "Level 2 Supervisor", color: "bg-yellow-600" },
    tags: [
      { label: "d710 対人関係", type: "icf" },
      { label: "b164 高次認知機能", type: "icf" },
      { label: "交渉 (Negotiation)", type: "social" },
      { label: "資源管理", type: "cognitive" }
    ],
    stats: { visual: 3, audio: 2, motor: 1, cognitive: 5, social: 5 },
    redFlags: ["盗賊（他害要素）による葛藤", "交渉決裂時のフラストレーション"],
    translation: {
      title: "「Win-Win」を作る交渉トレーニング",
      content: "勝利のためには他者との「資源トレード」が不可欠。自分の欲しいものを伝えるだけでなく、相手にとってもメリットのある提案をする必要があるため、他者視点の取得（ToM）とアサーションの実践的な練習の場となる。",
      key: "互恵的交渉と資源配分"
    },
    protocol: {
      title: "SSTとしてのカタン：交渉編",
      time: "60min",
      steps: [
        { title: "Step 1: 初期配置", desc: "確率（数字）と資源のバランスを考え、長期的な見通しを立てる。" },
        { title: "Step 2: 交渉フェーズ", desc: "「羊をあげるからレンガをください」等の具体的かつ礼儀正しい依頼を練習する。" },
        { title: "Step 3: 敗北の受容", desc: "サイコロの運要素による理不尽さを受け入れ、感情をコントロールする。" }
      ]
    }
  }
];

// --- 30分野のリスト (出口先生のリスト) ---
const OTAKU_CATEGORIES = [
  "アニメ", "漫画", "ライトノベル", "同人誌",
  "プラモデル", "フィギュア", "ドール", "鉄道模型",
  "アイドル", "プロレス", "コスプレ衣装", "メイド・コスプレ関連サービス",
  "スマートフォンゲーム", "家庭用・コンシューマーゲーム", "PCゲーム", "インディー・同人ゲーム", "アナログゲーム", "トレーディングカード",
  "ボーイズラブ", "音声合成", "トイガン", "サバイバルゲーム",
  "ラジコン", "ミニ四駆", "ミニカー", "声優",
  "PC組み立て／電子工作", "ディズニー関連", "VTuber", "特撮"
];

// --- 成分タグのプリセット (選択肢) ---
const PRESET_TAGS = [
  // ICF (Body/Activity)
  { label: "b140 注意機能", type: "icf" },
  { label: "b147 精神運動機能", type: "icf" },
  { label: "b152 情動機能", type: "icf" },
  { label: "d210 動作の遂行", type: "icf" },
  { label: "d710 対人関係", type: "icf" },
  // Psychology
  { label: "自己効力感", type: "psych" },
  { label: "失敗受容", type: "psych" },
  { label: "役割演技", type: "psych" },
  { label: "カタルシス", type: "psych" },
  { label: "収集行動", type: "psych" },
  // Motor/Sensory
  { label: "巧緻動作", type: "motor" },
  { label: "協調運動", type: "motor" },
  { label: "感覚統合", type: "motor" },
  // Social
  { label: "協力行動", type: "social" },
  { label: "共感性", type: "social" },
  { label: "ルール理解", type: "social" }
];

// --- コンポーネント: 詳細ビュー (DetailView) ---
const DetailView = ({ data, onBack, showToast }) => {
  const [activeTab, setActiveTab] = useState('translation');
  const [showModal, setShowModal] = useState(false);

  // カテゴリごとのアイコン
  const CategoryIcon = () => {
    if (data.category === 'game') return <Gamepad2 size={48} className="text-red-500" />;
    if (data.category === 'anime') return <Tv size={48} className="text-green-500" />;
    if (data.category === 'plamo') return <PenTool size={48} className="text-blue-500" />;
    if (data.category === 'trpg') return <Dices size={48} className="text-purple-500" />;
    return <Puzzle size={48} className="text-yellow-500" />;
  };

  const headerColor = data.category === 'game' ? 'from-red-600 to-red-500' : 
                    data.category === 'anime' ? 'from-green-600 to-green-500' : 
                    data.category === 'plamo' ? 'from-blue-600 to-blue-500' : 
                    data.category === 'trpg' ? 'from-purple-600 to-purple-500' : 'from-yellow-500 to-orange-400';

  return (
    <div className="animate-fade-in pb-20">
      <button onClick={onBack} className="flex items-center text-slate-500 mb-4 hover:text-indigo-600">
        <ChevronLeft size={20} /> Back to List
      </button>

      {/* Hero Section */}
      <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 relative mb-6">
        {data.isCertified && (
          <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100 flex items-center shadow-sm">
            <Award size={14} className="mr-1 fill-indigo-100" /> JOSCR Certified
          </div>
        )}
        <div className={`bg-gradient-to-r ${headerColor} h-32 relative`}>
          <div className="absolute -bottom-10 left-6 w-24 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center border-4 border-white">
            <CategoryIcon />
          </div>
        </div>
        <div className="pt-12 px-6 pb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{data.title}</h2>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
             <span className="flex items-center bg-slate-100 px-2 py-0.5 rounded text-slate-600"><FileText size={12} className="mr-1"/> Ver {data.version}</span>
             <span className="flex items-center text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">Evidence: {data.evidenceLevel}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.tags.map((tag, i) => (
              <span key={i} className={`px-2 py-1 rounded text-xs font-medium border ${tag.type === 'icf' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{tag.label}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Stats */}
        <section className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center"><Activity size={14} className="mr-2" /> 刺激・負荷レベル</h3>
            {['visual', 'audio', 'motor', 'cognitive', 'social'].map((key) => (
              <div key={key} className="mb-3">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1 capitalize"><span>{key}</span><span className="font-bold">{data.stats[key]}/5</span></div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-400" style={{ width: `${(data.stats[key] / 5) * 100}%` }}></div></div>
              </div>
            ))}
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
             <div className="flex items-center text-red-800 text-sm font-bold mb-2"><AlertTriangle size={16} className="mr-2" /> Red Flags</div>
             <ul className="list-disc list-inside text-xs text-red-700 space-y-1">{data.redFlags.map((f, i) => <li key={i}>{f}</li>)}</ul>
          </div>
        </section>

        {/* Right Content */}
        <section className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
           {/* Tab Navigation (Added Remix back) */}
           <div className="flex border-b border-slate-200 mb-4">
             {['translation', 'protocol', 'remix'].map(tab => (
               <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 text-sm font-medium capitalize border-b-2 ${activeTab === tab ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent'}`}>{tab}</button>
             ))}
           </div>
           
           {activeTab === 'translation' && (
             <div className="animate-fade-in">
                <h4 className="flex items-center text-base font-bold text-slate-800 mb-3"><Brain size={18} className="mr-2 text-indigo-500"/>{data.translation.title}</h4>
                <p className="text-sm leading-relaxed mb-4 text-slate-600">{data.translation.content}</p>
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400"><h5 className="font-bold text-sm text-indigo-900 mb-1">Clinical Key: {data.translation.key}</h5></div>
             </div>
           )}

           {activeTab === 'protocol' && (
             <div className="animate-fade-in space-y-4">
               <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg"><h4 className="text-sm font-bold">{data.protocol.title}</h4><span className="text-xs bg-white px-2 py-1 rounded border">Time: {data.protocol.time}</span></div>
               {data.protocol.steps.map((step, i) => (
                 <div key={i} className="pl-4 border-l-2 border-indigo-100 relative"><div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-500"></div><h5 className="font-bold text-sm text-indigo-700">{step.title}</h5><p className="text-xs text-slate-600">{step.desc}</p></div>
               ))}
             </div>
           )}

           {activeTab === 'remix' && (
              <div className="animate-fade-in space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-indigo-900">あなたの実践を共有しよう</h4>
                    <p className="text-xs text-indigo-700">このプロトコルを元に、新しいアレンジを作成できます。</p>
                  </div>
                  <button 
                    onClick={() => showToast("Remix作成画面へ(未実装)")}
                    className="text-xs flex items-center bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition-all"
                  >
                    <GitFork size={14} className="mr-2"/> Remixを作成
                  </button>
                </div>
                
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Community Remixes</h5>

                {/* Remix Mock Cards */}
                <div className="group border border-slate-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer bg-white">
                   <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold mr-2">小児・発達</span>
                        <h5 className="text-sm font-bold text-slate-700 group-hover:text-indigo-600">難易度調整Ver: スモールステップ化</h5>
                      </div>
                      <span className="text-[10px] text-slate-400">2023.10.15</span>
                   </div>
                   <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                     注意維持が困難なケースに対し、ステップ2をさらに細分化し、1分ごとの休憩を取り入れたアレンジ。
                   </p>
                   <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                      <div className="flex items-center text-[10px] text-slate-500">
                         <User size={12} className="mr-1"/> OT_Suzuki
                      </div>
                      <div className="flex space-x-3 text-[10px] text-slate-400">
                         <span className="flex items-center"><Heart size={10} className="mr-1"/> 12</span>
                         <span className="flex items-center"><GitFork size={10} className="mr-1"/> 2</span>
                      </div>
                   </div>
                </div>
              </div>
           )}
        </section>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-slate-200 p-3 shadow-lg z-40">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
           <div className="flex space-x-4">
             <button onClick={() => showToast("保存済みアイテムに追加しました")} className="text-slate-400 hover:text-indigo-500 transition-colors"><Bookmark /></button>
             <button onClick={() => showToast("コメント欄へスクロール(未実装)")} className="text-slate-400 hover:text-indigo-500 transition-colors"><MessageSquare /></button>
           </div>
           <button onClick={() => setShowModal(true)} className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center hover:bg-slate-800"><Target size={16} className="mr-2" /> 臨床で使用する</button>
        </div>
      </div>
      
      {/* Action Modal (Simplified) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
           <div className="bg-white rounded-xl p-6 w-full max-w-sm animate-slide-up" onClick={e => e.stopPropagation()}>
              <h3 className="font-bold mb-4">アクションを選択</h3>
              <button onClick={() => { setShowModal(false); showToast("PDFダウンロードを開始"); }} className="w-full text-left p-3 hover:bg-slate-50 border-b flex items-center group"><div className="bg-red-100 p-2 rounded mr-3 group-hover:bg-red-200 transition-colors"><FileText size={18} className="text-red-500"/></div><span>PDFを出力</span></button>
              <button onClick={() => { setShowModal(false); showToast("マイページに記録しました"); }} className="w-full text-left p-3 hover:bg-slate-50 border-b flex items-center group"><div className="bg-blue-100 p-2 rounded mr-3 group-hover:bg-blue-200 transition-colors"><ClipboardList size={18} className="text-blue-500"/></div><span>実施記録をつける</span></button>
              <button onClick={() => { setShowModal(false); showToast("仕事依頼フォームへ移動(未実装)"); }} className="w-full text-left p-3 hover:bg-slate-50 flex items-center group"><div className="bg-indigo-100 p-2 rounded mr-3 group-hover:bg-indigo-200 transition-colors"><Briefcase size={18} className="text-indigo-500"/></div><span className="text-indigo-700 font-bold">投稿者に仕事依頼</span></button>
           </div>
        </div>
      )}
    </div>
  );
};

// --- コンポーネント: 投稿・編集画面 (EditorView) ---
const EditorView = ({ onCancel, onSave }) => {
  const [stats, setStats] = useState({ visual: 3, audio: 3, motor: 3, cognitive: 3, social: 3 });
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSlider = (key, val) => setStats({ ...stats, [key]: parseInt(val) });
  
  const toggleTag = (tag) => {
    if (selectedTags.some(t => t.label === tag.label)) {
      setSelectedTags(selectedTags.filter(t => t.label !== tag.label));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onSave(); // 完了通知
    }, 1500); // 1.5秒のセーブ演出
  };

  return (
    <div className="animate-slide-up pb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">新規プロトコル作成</h2>
        <button onClick={onCancel} className="text-slate-500 hover:text-slate-800"><X /></button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-8">
        {/* 1. Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">作品タイトル</label>
            <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:outline-none" placeholder="例: ドラゴンクエストIII" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">カテゴリー (30分野)</label>
            <select className="w-full border border-slate-300 rounded p-2 text-sm bg-white focus:ring-2 focus:ring-indigo-200 focus:outline-none">
              <option value="">カテゴリーを選択...</option>
              {OTAKU_CATEGORIES.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. Clinical Ingredients (Tag Selection) - 改善点 */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-3 flex items-center">
            <Tag size={14} className="mr-1"/> 成分タグ選択 (Clinical Ingredients)
          </label>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="text-[10px] text-slate-400 mb-3">この作品に含まれる治療的要素を選択してください（複数可）</p>
            <div className="flex flex-wrap gap-2">
              {PRESET_TAGS.map((tag, i) => {
                const isSelected = selectedTags.some(t => t.label === tag.label);
                return (
                  <button
                    key={i}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      isSelected 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                        : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Clinical Translation (Text) - ハードル下げ */}
        <div>
           <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center">
             <Brain size={14} className="mr-1"/> 臨床翻訳メモ (Memo)
           </label>
           <p className="text-[10px] text-slate-400 mb-2">
             上記で選んだタグについて、具体的なシーンや活用法を補足してください（箇条書きでもOK）。
           </p>
           <textarea 
             className="w-full border border-slate-300 rounded p-3 text-sm h-24 focus:ring-2 focus:ring-indigo-200 focus:outline-none" 
             placeholder="例: レベルアップ音が報酬系への刺激になります。また、パーティー編成は役割分担の練習になります。"
           ></textarea>
        </div>

        {/* 4. Stats Sliders */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-3 flex items-center"><Activity size={14} className="mr-1"/> 刺激・負荷パラメータ</label>
          <div className="grid grid-cols-1 gap-4">
            {Object.keys(stats).map(key => (
              <div key={key} className="flex items-center">
                <span className="w-20 text-xs font-bold capitalize text-slate-600">{key}</span>
                <input 
                  type="range" min="1" max="5" value={stats[key]} 
                  onChange={(e) => handleSlider(key, e.target.value)}
                  className="flex-grow mx-4 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="w-8 text-center text-sm font-bold text-indigo-600">{stats[key]}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Submit */}
        <div className="pt-4 border-t border-slate-100 flex flex-col items-end">
           <div className="flex items-center mb-2">
             <Info size={12} className="text-slate-400 mr-1" />
             <span className="text-[10px] text-slate-400">※現在はベータ版デモのため、実際には保存されません</span>
           </div>
           <button 
             onClick={handleSave} 
             disabled={isSaving}
             className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center shadow-lg transition-all ${isSaving ? 'bg-indigo-400 text-white cursor-wait' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'}`}
           >
             {isSaving ? (
               <><Loader2 size={16} className="mr-2 animate-spin" /> 保存中...</>
             ) : (
               <><Save size={16} className="mr-2" /> データベースに登録</>
             )}
           </button>
        </div>
      </div>
    </div>
  );
};

// --- メインアプリ (Main Router) ---
const JOSCRApp = () => {
  const [view, setView] = useState('home'); // home, detail, editor
  const [selectedId, setSelectedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all'); // all, game, anime, plamo, trpg, boardgame
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    setView('detail');
  };

  // フィルタリングロジック
  const filteredDB = activeCategory === 'all' 
    ? mockDB 
    : mockDB.filter(d => d.category === activeCategory);

  const currentData = mockDB.find(d => d.id === selectedId);

  // カテゴリボタンコンポーネント
  const CategoryTab = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => setActiveCategory(id)}
      className={`px-4 py-2 rounded-full text-xs font-bold flex items-center transition-all whitespace-nowrap ${
        activeCategory === id 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
      }`}
    >
      {Icon && <Icon size={14} className="mr-1.5" />}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
      `}</style>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg z-[60] text-sm animate-fade-in flex items-center whitespace-nowrap">
          <Info size={16} className="mr-2" />
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded flex items-center justify-center font-bold text-lg shadow-lg">J</div>
            <div className="leading-tight">
              <h1 className="font-bold text-lg tracking-wider">JOSCR <span className="text-indigo-400 text-xs font-normal">DB [Beta]</span></h1>
            </div>
          </div>
          
          {/* Search Bar (New!) */}
          <div className="hidden md:flex flex-1 max-w-sm mx-4 relative">
             <input 
               type="text" 
               placeholder="作品名・ICF・症状で検索..." 
               className="w-full bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
             />
             <Search size={14} className="absolute right-3 top-2.5 text-slate-500" />
          </div>

          <div className="flex items-center space-x-3">
             {view !== 'editor' && (
               <button onClick={() => setView('editor')} className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center shadow-indigo-500/50 shadow-lg">
                 <Plus size={14} className="mr-1"/> New Entry
               </button>
             )}
             <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold border border-slate-600 cursor-pointer hover:bg-slate-600 transition-colors" onClick={() => showToast("ベータ版のため、現在はログイン不要ですべての機能を体験できます")}>KI</div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {view === 'home' && (
          <div className="animate-fade-in">
             <div className="mb-6">
               <h2 className="text-xl font-bold text-slate-800 mb-2">Featured Protocols</h2>
               <p className="text-sm text-slate-500 mb-4">臨床実践に基づいた最新のオタク文化プロトコル</p>
               
               {/* Category Filter Tabs */}
               <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
                 <CategoryTab id="all" label="すべて" icon={Layers} />
                 <CategoryTab id="game" label="ゲーム" icon={Gamepad2} />
                 <CategoryTab id="anime" label="アニメ・映像" icon={Tv} />
                 <CategoryTab id="plamo" label="プラモデル" icon={PenTool} />
                 <CategoryTab id="trpg" label="TRPG" icon={Dices} />
                 <CategoryTab id="boardgame" label="ボードゲーム" icon={Puzzle} />
               </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {filteredDB.map(item => (
                 <div key={item.id} onClick={() => handleSelect(item.id)} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all group animate-slide-up">
                    <div className={`h-24 bg-gradient-to-r ${item.category === 'game' ? 'from-red-500 to-orange-400' : item.category === 'anime' ? 'from-green-500 to-emerald-400' : item.category === 'plamo' ? 'from-blue-500 to-cyan-400' : item.category === 'trpg' ? 'from-purple-600 to-purple-500' : 'from-yellow-500 to-orange-400'} relative`}>
                       <div className="absolute bottom-2 right-2 bg-white/20 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white font-bold border border-white/30 uppercase">{item.category}</div>
                    </div>
                    <div className="p-4">
                       <h3 className="font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                       <p className="text-xs text-slate-500 mb-3 line-clamp-2">{item.translation.title}</p>
                       <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{tag.label}</span>
                          ))}
                          {item.tags.length > 2 && <span className="text-[10px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">+{item.tags.length - 2}</span>}
                       </div>
                    </div>
                 </div>
               ))}
               
               {filteredDB.length === 0 && (
                 <div className="col-span-full py-10 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                   <p className="text-sm">このカテゴリーのプロトコルはまだありません</p>
                 </div>
               )}
             </div>
          </div>
        )}

        {view === 'detail' && currentData && (
          <DetailView data={currentData} onBack={() => setView('home')} showToast={showToast} />
        )}

        {view === 'editor' && (
          <EditorView 
            onCancel={() => setView('home')} 
            onSave={() => {
              showToast("【Demo】投稿体験ありがとうございます！正式リリースをお楽しみに（データはリセットされます）");
              setView('home');
            }}
          />
        )}
      </main>
    </div>
  );
};

export default JOSCRApp;
