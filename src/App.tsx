import {useState,useEffect} from "react";
import {BarChart,Bar,AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,Cell} from "recharts";

const TOD=new Date("2025-02-20");
const BR={p:"#0D2B6B",a:"#1A7DC4",aL:"#E8F4FD",d:"#081A45",g:"#C9A227"};
const C={p:"#0D2B6B",pL:"#EEF2FF",a:"#1A7DC4",aL:"#E8F4FD",ok:"#15803D",okL:"#DCFCE7",wa:"#B45309",waL:"#FEF3C7",er:"#DC2626",erL:"#FEE2E2",w:"#FFFFFF",g0:"#F8FAFC",g1:"#F1F5F9",g2:"#E2E8F0",g3:"#CBD5E1",g4:"#94A3B8",g5:"#64748B",g7:"#334155",g9:"#0F172A",or:"#EA580C",orL:"#FFF7ED"};

const mk=(id,code,name,unit,qty,pu,av,s,e,kids=[])=>({id,code,name,unit,qty,pu,avance:av,startDate:s,endDate:e,children:kids});
const P1=[
  mk("a1","01","OBRAS PRELIMINARES","",0,0,100,"2024-03-01","2024-03-31",[
    mk("a1a","01.01","Movilización","glb",1,8500,100,"2024-03-01","2024-03-15"),
    mk("a1b","01.02","Trazo y replanteo","m2",850,3.5,100,"2024-03-10","2024-03-31")]),
  mk("a2","02","MOVIMIENTO DE TIERRAS","",0,0,86,"2024-04-01","2024-05-31",[
    mk("a2a","02.01","Excavación masiva","m3",1200,85,100,"2024-04-01","2024-04-30",[
      mk("a2a1","02.01.01","Excavación manual","m3",200,120,100,"2024-04-01","2024-04-15"),
      mk("a2a2","02.01.02","Excavación mecánica","m3",1000,75,100,"2024-04-10","2024-04-30")]),
    mk("a2b","02.02","Relleno y compactado","m3",380,65,72,"2024-05-01","2024-05-31")]),
  mk("a3","03","ESTRUCTURA","",0,0,55,"2024-06-01","2025-02-28",[
    mk("a3a","03.01","Cimentación","m3",380,420,100,"2024-06-01","2024-07-31"),
    mk("a3b","03.02","Columnas y placas","m3",290,550,72,"2024-08-01","2025-01-31"),
    mk("a3c","03.03","Vigas y losas","m3",420,480,48,"2024-10-01","2025-02-28")]),
  mk("a4","04","ARQUITECTURA","",0,0,14,"2025-01-01","2025-05-31",[
    mk("a4a","04.01","Muros y tabiques","m2",3200,75,28,"2025-01-01","2025-04-30"),
    mk("a4b","04.02","Revoques","m2",2800,45,0,"2025-03-01","2025-05-31")]),
  mk("a5","05","INSTALACIONES","",0,0,0,"2025-03-01","2025-06-30",[
    mk("a5a","05.01","Instalaciones eléctricas","pto",480,180,0,"2025-03-01","2025-05-31"),
    mk("a5b","05.02","Instalaciones sanitarias","pto",220,240,0,"2025-04-01","2025-06-30")])
];
const P2=[
  mk("b1","01","DEMOLICIONES","",0,0,100,"2024-06-01","2024-07-31",[
    mk("b1a","01.01","Demolición existente","m2",800,45,100,"2024-06-01","2024-07-31")]),
  mk("b2","02","MOVIMIENTO DE TIERRAS","",0,0,71,"2024-08-01","2024-12-31",[
    mk("b2a","02.01","Excavación y nivelación","m3",2100,65,71,"2024-08-01","2024-12-31")]),
  mk("b3","03","CIMENTACIÓN","",0,0,40,"2024-10-01","2025-04-30",[
    mk("b3a","03.01","Pilotes","und",64,3200,63,"2024-10-01","2025-01-31"),
    mk("b3b","03.02","Losa cimentación","m3",180,520,0,"2025-01-15","2025-04-30")])
];
const P3=[
  mk("c1","01","TRABAJOS PREVIOS","",0,0,100,"2024-09-01","2024-09-30",[
    mk("c1a","01.01","Trazo y replanteo","m2",9600,4.5,100,"2024-09-01","2024-09-30")]),
  mk("c2","02","PAVIMENTACIÓN","",0,0,60,"2024-10-01","2025-01-31",[
    mk("c2a","02.01","Subbase granular","m3",1920,85,100,"2024-10-01","2024-11-30"),
    mk("c2b","02.02","Base granular","m3",960,110,75,"2024-11-01","2024-12-31"),
    mk("c2c","02.03","Carpeta asfáltica","m2",9600,45,30,"2024-12-01","2025-01-31")]),
  mk("c3","03","OBRAS COMP.","",0,0,0,"2025-01-15","2025-03-31",[
    mk("c3a","03.01","Veredas y sardinel","m",6400,55,0,"2025-01-15","2025-03-31")])
];

const USERS0=[
  {id:"u1",name:"Ing. Mario Quispe",email:"admin@enginebg.pe",pass:"admin123",role:"admin",avatar:"MQ",company:"Engine Business Group",ap:[]},
  {id:"u2",name:"Ing. Rosa Paredes",email:"rparedes@enginebg.pe",pass:"sup123",role:"supervisor",avatar:"RP",company:"Engine Business Group",ap:["p1","p2"]},
  {id:"u3",name:"Tec. Carlos Villanueva",email:"cvillanueva@enginebg.pe",pass:"sup123",role:"supervisor",avatar:"CV",company:"Engine Business Group",ap:["p3"]},
  {id:"u4",name:"Arq. Juan Torres",email:"jtorres@inversiones.pe",pass:"cliente123",role:"client",avatar:"JT",company:"Inversiones Torres SAC",ap:["p1"]},
  {id:"u5",name:"Ing. Ana Mendoza",email:"amendoza@gore-ica.pe",pass:"cliente123",role:"client",avatar:"AM",company:"Gobierno Regional Ica",ap:["p2"]},
  {id:"u6",name:"Lic. Pedro Salas",email:"psalas@constructora.pe",pass:"cliente123",role:"client",avatar:"PS",company:"Constructora Salas SAC",ap:["p3"]},
];
const PROJS0=[
  {id:"p1",name:"Edificio Residencial Las Palmas",code:"EBG-2024-001",location:"Av. Javier Prado 1450, San Isidro",client:"Inversiones Torres SAC",startDate:"2024-03-01",endDate:"2025-06-30",discipline:"Edificación",driveUrl:"https://drive.google.com/drive/folders/p1",partidas:P1},
  {id:"p2",name:"Ampliación Hospital Regional Ica",code:"EBG-2024-002",location:"Prolongación Ayabaca s/n, Ica",client:"Gobierno Regional Ica",startDate:"2024-06-01",endDate:"2026-03-31",discipline:"Salud",driveUrl:"https://drive.google.com/drive/folders/p2",partidas:P2},
  {id:"p3",name:"Pavimentación Av. Los Maestros",code:"EBG-2024-003",location:"Av. Los Maestros km 2.5, Ica",client:"Constructora Salas SAC",startDate:"2024-09-01",endDate:"2025-03-31",discipline:"Vial",driveUrl:"",partidas:P3},
];
const ASSETS0=[
  {id:"s1",pid:"p1",code:"EQ-001",name:"Andamio multidireccional",qty:40,unit:"juego",ok:true,loc:"Piso 7-10",obs:"",fecha:"2025-01-20"},
  {id:"s2",pid:"p1",code:"EQ-002",name:"Mezcladora de concreto",qty:2,unit:"und",ok:true,loc:"Sótano",obs:"",fecha:"2024-11-10"},
  {id:"s3",pid:"p1",code:"EQ-003",name:"Bomba de concreto",qty:1,unit:"und",ok:false,loc:"Por definir",obs:"Pendiente arribo",fecha:""},
  {id:"s4",pid:"p2",code:"EQ-001",name:"Grúa torre",qty:1,unit:"und",ok:true,loc:"Eje central",obs:"Operativa",fecha:"2024-12-01"},
  {id:"s5",pid:"p2",code:"EQ-002",name:"Equipo de pilotaje",qty:1,unit:"und",ok:false,loc:"Pendiente",obs:"En movilización",fecha:""},
  {id:"s6",pid:"p3",code:"EQ-001",name:"Compactadora vibratoria",qty:2,unit:"und",ok:true,loc:"km 1-2",obs:"",fecha:"2024-10-15"},
];
const OBRA0=[
  {id:"o1",pid:"p1",fecha:"2025-02-18",hora:"08:15",nota:"Inicio vaciado losa piso 6. Temperatura 22°C. Personal: 24 obreros.",photos:2,reg:"u2",edit:null},
  {id:"o2",pid:"p1",fecha:"2025-02-18",hora:"16:30",nota:"Fin vaciado losa piso 6. Sin incidencias. Curado iniciado.",photos:1,reg:"u2",edit:null},
  {id:"o3",pid:"p1",fecha:"2025-02-19",hora:"07:45",nota:"Paralización por lluvia hasta 10:00hrs. Tarifa de espera notificada.",photos:0,reg:"u2",edit:null},
  {id:"o4",pid:"p2",fecha:"2025-02-15",hora:"09:00",nota:"Inicio hinca pilotes zona Este. Instalados 4 pilotes según plano.",photos:2,reg:"u2",edit:null},
  {id:"o5",pid:"p3",fecha:"2025-01-10",hora:"08:00",nota:"Aplicación carpeta asfáltica km 0+500 a 0+900. Temperatura mezcla: 145°C.",photos:2,reg:"u3",edit:null},
];
const ADIC0=[
  {id:"d1",pid:"p1",code:"AD-001",name:"Micropilotes zona húmeda",unit:"und",qty:8,pu:2800,motivo:"Napa freática no prevista",status:"approved",fecha:"2025-01-15",total:22400},
  {id:"d2",pid:"p1",code:"AD-002",name:"Refuerzo columnas B-4 a B-8",unit:"kg",qty:1200,pu:9.5,motivo:"Cambio diseño por carga adicional",status:"pending",fecha:"2025-02-10",total:11400},
  {id:"d3",pid:"p2",code:"AD-001",name:"Muros contención perimetral",unit:"m3",qty:45,pu:680,motivo:"Protección excavación",status:"approved",fecha:"2024-11-20",total:30600},
];
const ADV0=[
  {id:"v1",pid:"p1",ptid:"a3b",fecha:"2025-01-10",pct:72,obs:"Columnas pisos 1-8.",status:"approved",photos:2,reg:"u2"},
  {id:"v2",pid:"p1",ptid:"a3c",fecha:"2025-02-15",pct:48,obs:"Losas pisos 1-5.",status:"pending",photos:1,reg:"u2"},
  {id:"v3",pid:"p2",ptid:"b2a",fecha:"2024-12-30",pct:71,obs:"Napa freática a 3.8m.",status:"approved",photos:2,reg:"u2"},
  {id:"v4",pid:"p3",ptid:"c2b",fecha:"2025-01-08",pct:75,obs:"Base en progreso.",status:"pending",photos:1,reg:"u3"},
];

// Helpers
const fmtK=n=>n>=1e6?"S/ "+(n/1e6).toFixed(2)+"M":"S/ "+(n/1e3).toFixed(0)+"K";
const fmt=n=>"S/ "+n.toLocaleString("es-PE",{minimumFractionDigits:2,maximumFractionDigits:2});
const fmtD=d=>{if(!d)return"";const p=d.split("-");return p[2]+"/"+p[1]+"/"+p[0];};
const delay=(e,av)=>{if(av>=100||!e)return 0;const d=Math.floor((TOD-new Date(e))/86400000);return d>0?d:0;};
const expiring=(e,av)=>{if(av>=100||!e)return false;const d=Math.floor((new Date(e)-TOD)/86400000);return d>=0&&d<=14;};
const flatten=pts=>{const r=[];const f=ps=>ps.forEach(p=>{r.push(p);if(p.children?.length)f(p.children);});f(pts);return r;};
const leaves=pts=>flatten(pts).filter(p=>!p.children?.length);
const cVal=pts=>leaves(pts).reduce((s,p)=>s+(p.qty||0)*(p.pu||0)*(p.avance||0)/100,0);
const cBud=pts=>leaves(pts).reduce((s,p)=>s+(p.qty||0)*(p.pu||0),0);
const cPrg=pts=>{const l=leaves(pts);return l.length?Math.round(l.reduce((s,p)=>s+(p.avance||0),0)/l.length):0;};
const updPt=(pts,id,fn)=>pts.map(p=>{if(p.id===id)return fn(p);if(p.children?.length)return{...p,children:updPt(p.children,id,fn)};return p;});
const delPt=(pts,id)=>pts.filter(p=>p.id!==id).map(p=>({...p,children:p.children?delPt(p.children,id):[]}));
const sCo=s=>s==="approved"?C.ok:s==="pending"?C.wa:C.er;
const sBg=s=>s==="approved"?C.okL:s==="pending"?C.waL:C.erL;
const sLb=s=>s==="approved"?"Aprobado":s==="pending"?"Pendiente":"Rechazado";
const rLb=r=>r==="admin"?"Administrador":r==="supervisor"?"Supervisor":"Cliente";
const rCo=r=>r==="admin"?C.er:r==="supervisor"?C.a:C.ok;
const rBg=r=>r==="admin"?C.erL:r==="supervisor"?C.aL:C.okL;

// Base UI
const Phone=({children})=>(
  <div style={{display:"flex",justifyContent:"center",alignItems:"flex-start",minHeight:"100vh",background:"#C8D3E3",padding:"20px 0",fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
    <div style={{width:390,minHeight:820,background:C.w,borderRadius:44,overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,0.3)",position:"relative",display:"flex",flexDirection:"column"}}>
      <div style={{background:BR.p,padding:"10px 24px 6px",display:"flex",justifyContent:"space-between",flexShrink:0}}>
        <span style={{color:"white",fontSize:12,fontWeight:600}}>9:41</span>
        <span style={{color:"white",fontSize:11}}>●●● WiFi 🔋</span>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>{children}</div>
    </div>
  </div>
);
const TBar=({title,sub,onBack,right,user})=>(
  <div style={{background:"linear-gradient(135deg,#081A45,#0D2B6B)",padding:"12px 16px 14px",flexShrink:0}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      {onBack&&<button onClick={onBack} style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"white",fontSize:18}}>‹</button>}
      {!onBack&&<div style={{width:22,height:22,background:"rgba(255,255,255,0.15)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:12,flexShrink:0}}>⬡</div>}
      <div style={{flex:1,minWidth:0}}>
        <div style={{color:"white",fontSize:15,fontWeight:700,lineHeight:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{title}</div>
        {sub&&<div style={{color:"rgba(255,255,255,0.6)",fontSize:11,marginTop:2}}>{sub}</div>}
      </div>
      {right}
      {user&&<div style={{width:34,height:34,borderRadius:17,background:"rgba(255,255,255,0.18)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:12,fontWeight:700,border:"1.5px solid rgba(255,255,255,0.35)",flexShrink:0}}>{user.avatar}</div>}
    </div>
  </div>
);
const Scrl=({children,style={}})=><div style={{flex:1,overflowY:"auto",...style}}>{children}</div>;
const Card=({children,style={},onClick})=><div onClick={onClick} style={{background:C.w,borderRadius:14,border:"1px solid "+C.g2,padding:"14px 16px",...style,cursor:onClick?"pointer":"default"}}>{children}</div>;
const Pill=({label,color,bg,sz=11})=><span style={{background:bg,color,fontSize:sz,fontWeight:600,padding:"3px 9px",borderRadius:20,display:"inline-block",whiteSpace:"nowrap"}}>{label}</span>;
const Btn=({label,onClick,col=BR.p,full=false,out=false,sm=false,icon=""})=><button onClick={onClick} style={{background:out?"transparent":col,color:out?col:C.w,border:"1.5px solid "+col,borderRadius:12,padding:sm?"6px 12px":"11px 18px",fontSize:sm?12:14,fontWeight:600,width:full?"100%":"auto",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6,justifyContent:"center",fontFamily:"inherit"}}>{icon}{label}</button>;
const PBar=({v,col=BR.p,h=8})=><div style={{background:C.g2,borderRadius:99,height:h,overflow:"hidden"}}><div style={{width:Math.min(100,v||0)+"%",height:"100%",background:col,borderRadius:99}}/></div>;
const Inp=({label,value,onChange,type="text",ph=""})=>(
  <div style={{marginBottom:10}}>
    {label&&<div style={{fontSize:11,color:C.g5,fontWeight:600,marginBottom:4}}>{label}</div>}
    <input value={value} onChange={e=>onChange(e.target.value)} type={type} placeholder={ph} style={{width:"100%",border:"1.5px solid "+C.g2,borderRadius:10,padding:"9px 12px",fontSize:13,color:C.g9,background:C.g0,outline:"none",boxSizing:"border-box"}}/>
  </div>
);
const Sel=({label,value,onChange,opts})=>(
  <div style={{marginBottom:10}}>
    {label&&<div style={{fontSize:11,color:C.g5,fontWeight:600,marginBottom:4}}>{label}</div>}
    <select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",border:"1.5px solid "+C.g2,borderRadius:10,padding:"9px 12px",fontSize:13,color:C.g9,background:C.g0,outline:"none",boxSizing:"border-box"}}>
      {opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}
    </select>
  </div>
);
const Mdl=({title,onClose,children})=>(
  <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)",zIndex:200,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
    <div style={{background:C.w,borderRadius:"20px 20px 0 0",maxHeight:"88%",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"16px 20px 12px",borderBottom:"1px solid "+C.g2,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div style={{fontSize:15,fontWeight:700,color:C.g9}}>{title}</div>
        <button onClick={onClose} style={{background:C.g1,border:"none",borderRadius:99,width:28,height:28,cursor:"pointer",fontSize:14}}>✕</button>
      </div>
      <div style={{overflowY:"auto",padding:"16px 20px 24px",flex:1}}>{children}</div>
    </div>
  </div>
);
const Toast=({msg})=>msg?<div style={{position:"absolute",bottom:78,left:20,right:20,background:C.g9,color:"white",padding:"10px 16px",borderRadius:12,fontSize:12,fontWeight:600,textAlign:"center",zIndex:300,pointerEvents:"none"}}>{msg}</div>:null;
const NavBar=({active,onNav,role})=>{
  const it=role==="admin"?[["home","🏠","Inicio"],["projects","🏗️","Obras"],["users","👥","Usuarios"],["chart","📊","Reportes"],["me","👤","Perfil"]]
    :role==="supervisor"?[["home","🏠","Inicio"],["projects","🏗️","Obras"],["cam","📷","Registro"],["chart","📊","Reportes"],["me","👤","Perfil"]]
    :[["home","🏠","Inicio"],["projects","🏗️","Obras"],["chart","📊","Reportes"],["me","👤","Perfil"]];
  return(
    <div style={{borderTop:"1px solid "+C.g2,background:C.w,display:"flex",padding:"6px 0 10px",flexShrink:0}}>
      {it.map(([id,icon,lbl])=>(
        <button key={id} onClick={()=>onNav(id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",padding:"4px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
          <span style={{fontSize:20}}>{icon}</span>
          <span style={{fontSize:9,fontWeight:active===id?700:400,color:active===id?BR.p:C.g4}}>{lbl}</span>
          {active===id&&<div style={{width:20,height:2.5,background:BR.p,borderRadius:99}}/>}
        </button>
      ))}
    </div>
  );
};

// Splash
function Splash({onDone}){
  const [ph,setPh]=useState(0);
  useEffect(()=>{
    const ts=[setTimeout(()=>setPh(1),300),setTimeout(()=>setPh(2),900),setTimeout(()=>setPh(3),1600),setTimeout(()=>setPh(4),2200),setTimeout(onDone,2900)];
    return()=>ts.forEach(clearTimeout);
  },[]);
  return(
    <div style={{flex:1,background:"linear-gradient(160deg,#081A45 0%,#0D2B6B 55%,#1A7DC4 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-60,right:-60,width:200,height:200,border:"1px solid rgba(255,255,255,0.07)",borderRadius:"50%"}}/>
      <div style={{position:"absolute",bottom:-80,left:-80,width:240,height:240,border:"1px solid rgba(255,255,255,0.05)",borderRadius:"50%"}}/>
      <div style={{transform:"scale("+(ph>=1?1:0.4)+") translateY("+(ph>=1?0:40)+"px)",opacity:ph>=1?1:0,transition:"all 0.7s cubic-bezier(0.34,1.56,0.64,1)",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{width:90,height:90,background:"rgba(255,255,255,0.1)",borderRadius:24,border:"2px solid rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20,boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
          <svg width="52" height="52" viewBox="0 0 40 40" fill="none">
            <path d="M6 20L20 6L34 20L20 34Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            <rect x="14" y="14" width="12" height="12" rx="3" fill="white" opacity="0.9"/>
            <circle cx="20" cy="20" r="3" fill="#1A7DC4"/>
          </svg>
        </div>
        <div style={{opacity:ph>=2?1:0,transform:"translateY("+(ph>=2?0:16)+"px)",transition:"all 0.5s ease",textAlign:"center"}}>
          <div style={{color:"white",fontSize:22,fontWeight:800,letterSpacing:-0.5}}>Engine Business</div>
          <div style={{color:"#C9A227",fontSize:22,fontWeight:800,letterSpacing:-0.5}}>Group</div>
        </div>
        <div style={{width:ph>=3?120:0,height:1,background:"linear-gradient(90deg,transparent,rgba(201,162,39,0.8),transparent)",transition:"width 0.5s ease",margin:"14px 0"}}/>
        <div style={{opacity:ph>=3?1:0,color:"rgba(255,255,255,0.5)",fontSize:11,letterSpacing:2,textTransform:"uppercase"}}>Supervisión · Gestión · Control</div>
      </div>
      <div style={{position:"absolute",bottom:60,left:60,right:60,opacity:ph>=2?1:0,transition:"opacity 0.4s ease"}}>
        <div style={{height:2,background:"rgba(255,255,255,0.1)",borderRadius:99,overflow:"hidden"}}>
          <div style={{height:"100%",width:ph>=4?"100%":ph>=3?"70%":ph>=2?"30%":"0%",background:"linear-gradient(90deg,#1A7DC4,#C9A227)",borderRadius:99,transition:"width 0.6s ease"}}/>
        </div>
        <div style={{color:"rgba(255,255,255,0.3)",fontSize:10,textAlign:"center",marginTop:8}}>{ph>=4?"Listo":"Iniciando..."}</div>
      </div>
    </div>
  );
}

// Login
function Login({onLogin,users}){
  const [em,setEm]=useState("admin@enginebg.pe");
  const [pw,setPw]=useState("admin123");
  const [err,setErr]=useState("");
  const [ld,setLd]=useState(false);
  const [showQ,setShowQ]=useState(false);
  const go=(u)=>{
    const usr=u||users.find(x=>x.email===em&&x.pass===pw);
    if(!usr){setErr("Credenciales incorrectas");return;}
    setErr("");setLd(true);setTimeout(()=>{setLd(false);onLogin(usr);},700);
  };
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <div style={{background:"linear-gradient(160deg,#081A45,#0D2B6B 60%,#1A7DC4 100%)",padding:"44px 32px 36px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:150,height:150,border:"1px solid rgba(255,255,255,0.07)",borderRadius:"50%"}}/>
        <div style={{width:72,height:72,background:"rgba(255,255,255,0.12)",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,border:"2px solid rgba(255,255,255,0.22)"}}>
          <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
            <path d="M6 20L20 6L34 20L20 34Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            <rect x="14" y="14" width="12" height="12" rx="3" fill="white" opacity="0.9"/>
            <circle cx="20" cy="20" r="3" fill="#1A7DC4"/>
          </svg>
        </div>
        <div style={{color:"white",fontSize:20,fontWeight:800}}>Engine Business Group</div>
        <div style={{color:"#C9A227",fontSize:11,letterSpacing:2,marginTop:4,textTransform:"uppercase"}}>Sistema de Supervisión</div>
      </div>
      <div style={{flex:1,padding:"24px",overflowY:"auto"}}>
        <div style={{fontSize:17,fontWeight:700,color:C.g9,marginBottom:4}}>Iniciar sesión</div>
        <div style={{fontSize:12,color:C.g5,marginBottom:18}}>Ingresa tus credenciales de acceso</div>
        <Inp label="Correo electrónico" value={em} onChange={setEm} type="email"/>
        <Inp label="Contraseña" value={pw} onChange={setPw} type="password"/>
        {err&&<div style={{color:C.er,fontSize:12,marginBottom:10}}>⚠ {err}</div>}
        <Btn label={ld?"Verificando...":"Ingresar al sistema"} onClick={()=>go()} col={BR.p} full/>
        <button onClick={()=>setShowQ(!showQ)} style={{background:"none",border:"none",color:C.a,fontSize:12,marginTop:12,cursor:"pointer",width:"100%",fontFamily:"inherit"}}>{showQ?"▲ Ocultar cuentas de prueba":"▼ Ver cuentas de prueba"}</button>
        {showQ&&(
          <div style={{marginTop:8,background:C.g0,borderRadius:12,padding:"10px 14px"}}>
            {users.map(u=>(
              <div key={u.id} onClick={()=>go(u)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"1px solid "+C.g2,cursor:"pointer"}}>
                <div><div style={{fontSize:12,fontWeight:600,color:C.g7}}>{u.name}</div><div style={{fontSize:10,color:C.g4}}>{u.email}</div></div>
                <Pill label={rLb(u.role)} color={rCo(u.role)} bg={rBg(u.role)} sz={10}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Dashboard
function Dashboard({user,projects,advances,assets,onProject,onNav}){
  const mine=user.role==="admin"?projects:projects.filter(p=>user.ap.includes(p.id));
  const totalVal=mine.reduce((s,p)=>s+cVal(p.partidas),0);
  const pend=advances.filter(a=>mine.some(p=>p.id===a.pid)&&a.status==="pending").length;
  const avgPrg=mine.length?Math.round(mine.reduce((s,p)=>s+cPrg(p.partidas),0)/mine.length):0;
  const myAss=assets.filter(a=>mine.some(p=>p.id===a.pid));
  const instP=myAss.length?Math.round(myAss.filter(a=>a.ok).length/myAss.length*100):0;
  const dels=[];
  mine.forEach(p=>leaves(p.partidas).forEach(pt=>{const d=delay(pt.endDate,pt.avance);if(d>0)dels.push({name:pt.name,days:d,proj:p.name});}));
  dels.sort((a,b)=>b.days-a.days);
  const CLRS=["#0D2B6B","#1A7DC4","#15803D","#B45309","#DC2626","#6366F1"];
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:C.g0,overflow:"hidden"}}>
      <TBar title={"Hola, "+user.name.split(" ").slice(-1)[0]} sub={user.company} user={user}/>
      <Scrl style={{padding:"14px 14px 0"}}>
        <div style={{background:"linear-gradient(135deg,#0D2B6B,#1A7DC4)",borderRadius:14,padding:"14px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:28}}>{user.role==="admin"?"⚙️":user.role==="supervisor"?"🦺":"👁️"}</span>
          <div style={{flex:1}}>
            <div style={{color:"white",fontSize:13,fontWeight:700}}>{rLb(user.role)}</div>
            <div style={{color:"rgba(255,255,255,0.7)",fontSize:11}}>{mine.length} proyecto{mine.length!==1?"s":""} · Avance promedio: {avgPrg}%</div>
          </div>
          {pend>0&&<div style={{background:"rgba(255,255,255,0.2)",borderRadius:10,padding:"4px 10px",color:"white",fontSize:11,fontWeight:700}}>⏳ {pend}</div>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          {[{l:"Proyectos",v:mine.length,ic:"🏗️",c:BR.p},{l:"Valorizado",v:fmtK(totalVal),ic:"💰",c:C.ok},{l:"Avance prom.",v:avgPrg+"%",ic:"📈",c:C.a},{l:"Activos inst.",v:instP+"%",ic:"⚙️",c:C.or}].map((k,i)=>(
            <Card key={i} style={{padding:"12px 14px"}}><div style={{fontSize:22,marginBottom:6}}>{k.ic}</div><div style={{fontSize:18,fontWeight:800,color:k.c}}>{k.v}</div><div style={{fontSize:11,color:C.g5,marginTop:2}}>{k.l}</div></Card>
          ))}
        </div>
        {mine.length>0&&(
          <Card style={{marginBottom:14,padding:"12px 6px"}}>
            <div style={{fontSize:11,fontWeight:700,color:C.g7,marginBottom:8,paddingLeft:8}}>AVANCE GENERAL POR PROYECTO</div>
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={mine.map(p=>({n:p.code,v:cPrg(p.partidas),vl:Math.round(cVal(p.partidas)/cBud(p.partidas)*100)||0}))} margin={{left:-25,right:5}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.g1}/>
                <XAxis dataKey="n" tick={{fontSize:9,fill:C.g4}}/>
                <YAxis tick={{fontSize:9,fill:C.g4}} domain={[0,100]}/>
                <Tooltip formatter={(v,n)=>[v+"%",n==="v"?"Avance físico":"% Valorizado"]}/>
                <Bar dataKey="v" name="v" radius={[4,4,0,0]}>{mine.map((_,i)=><Cell key={i} fill={CLRS[i%6]}/>)}</Bar>
                <Bar dataKey="vl" name="vl" radius={[4,4,0,0]} fill={BR.g} opacity={0.4}/>
              </BarChart>
            </ResponsiveContainer>
            <div style={{display:"flex",gap:16,justifyContent:"center",marginTop:4}}>
              <span style={{fontSize:9,color:C.g4}}>■ Avance físico</span>
              <span style={{fontSize:9,color:C.g4}}>■ % Valorizado</span>
            </div>
          </Card>
        )}
        <div style={{fontSize:12,fontWeight:700,color:C.g7,marginBottom:8}}>🏗️ Proyectos</div>
        {mine.map(p=>{
          const prg=cPrg(p.partidas),val=cVal(p.partidas),dl=leaves(p.partidas).filter(pt=>delay(pt.endDate,pt.avance)>0).length,exp=leaves(p.partidas).filter(pt=>expiring(pt.endDate,pt.avance)).length;
          return(
            <Card key={p.id} onClick={()=>onProject(p)} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{flex:1,marginRight:8}}><div style={{fontSize:13,fontWeight:700,color:C.g9}}>{p.name}</div><div style={{fontSize:11,color:C.g4,marginTop:1}}>📍 {p.location.split(",").pop().trim()} · {p.discipline}</div></div>
                <Pill label={prg+"%"} color={prg<50?C.wa:C.ok} bg={prg<50?C.waL:C.okL}/>
              </div>
              <PBar v={prg} col={prg<50?C.wa:BR.p} h={6}/>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:8,alignItems:"center"}}>
                <span style={{fontSize:11,color:C.g5}}>Valorizado: <b style={{color:C.g9}}>{fmtK(val)}</b></span>
                <div style={{display:"flex",gap:4}}>
                  {dl>0&&<Pill label={"⚠"+dl} color={C.er} bg={C.erL} sz={10}/>}
                  {exp>0&&<Pill label={"⏰"+exp} color={C.wa} bg={C.waL} sz={10}/>}
                </div>
              </div>
            </Card>
          );
        })}
        {dels.length>0&&(
          <Card style={{marginBottom:10,borderLeft:"3px solid "+C.er}}>
            <div style={{fontSize:12,fontWeight:700,color:C.er,marginBottom:8}}>⚠️ Partidas con retraso ({dels.length})</div>
            {dels.slice(0,4).map((d,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid "+C.g1}}>
                <span style={{fontSize:11,color:C.g7,flex:1,marginRight:8}}>{d.name}</span>
                <Pill label={d.days+"d"} color={C.er} bg={C.erL} sz={10}/>
              </div>
            ))}
          </Card>
        )}
        <div style={{height:8}}/>
      </Scrl>
      <NavBar active="home" onNav={onNav} role={user.role}/>
    </div>
  );
}

// Projects List
function ProjList({user,projects,advances,onProject,onNav,onNew}){
  const [q,setQ]=useState("");
  const mine=user.role==="admin"?projects:projects.filter(p=>user.ap.includes(p.id));
  const filtered=mine.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.code.toLowerCase().includes(q.toLowerCase()));
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:C.g0,overflow:"hidden"}}>
      <TBar title="Proyectos" sub={mine.length+" proyectos"} user={user}
        right={user.role==="admin"&&<button onClick={onNew} style={{background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:10,padding:"6px 12px",color:"white",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Nuevo</button>}/>
      <div style={{padding:"10px 14px 6px",background:C.w,borderBottom:"1px solid "+C.g2,flexShrink:0}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍  Buscar proyecto..." style={{width:"100%",border:"1.5px solid "+C.g2,borderRadius:12,padding:"9px 14px",fontSize:13,outline:"none",boxSizing:"border-box",background:C.g0}}/>
      </div>
      <Scrl style={{padding:"10px 14px"}}>
        {filtered.map(p=>{
          const prg=cPrg(p.partidas),val=cVal(p.partidas),dl=leaves(p.partidas).filter(pt=>delay(pt.endDate,pt.avance)>0).length,exp=leaves(p.partidas).filter(pt=>expiring(pt.endDate,pt.avance)).length;
          return(
            <Card key={p.id} onClick={()=>onProject(p)} style={{marginBottom:10}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:44,height:44,background:C.aL,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🏗️</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.g9}}>{p.name}</div>
                  <div style={{fontSize:11,color:C.g5}}>{p.code} · {p.discipline}</div>
                  <PBar v={prg} col={prg<50?C.wa:BR.p} h={5}/>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:5,alignItems:"center"}}>
                    <span style={{fontSize:11,color:C.g7,fontWeight:600}}>{prg}% · {fmtK(val)}</span>
                    <div style={{display:"flex",gap:4}}>
                      {dl>0&&<Pill label={"⚠"+dl} color={C.er} bg={C.erL} sz={10}/>}
                      {exp>0&&<Pill label={"⏰"+exp} color={C.wa} bg={C.waL} sz={10}/>}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
        <div style={{height:8}}/>
      </Scrl>
      <NavBar active="projects" onNav={onNav} role={user.role}/>
    </div>
  );
}

// New Project
function NewProject({user,onSave,onBack}){
  const [d,setD]=useState({name:"",code:"",location:"",client:"",budget:"",startDate:"",endDate:"",discipline:"Edificación",description:"",driveUrl:""});
  const upd=(k,v)=>setD(x=>({...x,[k]:v}));
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:C.g0,overflow:"hidden"}}>
      <TBar title="Nuevo proyecto" onBack={onBack} user={user}/>
      <Scrl style={{padding:"14px"}}>
        <Inp label="Nombre del proyecto *" value={d.name} onChange={v=>upd("name",v)}/>
        <Inp label="Código *" value={d.code} onChange={v=>upd("code",v)} ph="EBG-2025-XXX"/>
        <Inp label="Ubicación" value={d.location} onChange={v=>upd("location",v)}/>
        <Inp label="Cliente / Contratante" value={d.client} onChange={v=>upd("client",v)}/>
        <Inp label="Presupuesto contrato (S/)" value={d.budget} onChange={v=>upd("budget",v)} type="number"/>
        <Sel label="Disciplina" value={d.discipline} onChange={v=>upd("discipline",v)} opts={[["Edificación","Edificación"],["Vial","Vial"],["Salud","Salud"],["Industrial","Industrial"],["Hidráulica","Hidráulica"],["Saneamiento","Saneamiento"],["Otro","Otro"]]}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Inp label="Fecha inicio" value={d.startDate} onChange={v=>upd("startDate",v)} type="date"/>
          <Inp label="Fecha fin" value={d.endDate} onChange={v=>upd("endDate",v)} type="date"/>
        </div>
        <Inp label="URL Google Drive" value={d.driveUrl} onChange={v=>upd("driveUrl",v)} ph="https://drive.google.com/..."/>
        <div style={{marginTop:6}}><Btn label="✓ Crear proyecto" onClick={()=>{if(!d.name||!d.code)return;onSave({...d,id:"p"+Date.now(),partidas:[],budget:parseFloat(d.budget)||0});}} col={C.ok} full/></div>
        <div style={{height:16}}/>
      </Scrl>
    </div>
  );
}

// Partidas Tab - tree editable
function PartTab({user,project,onUpdate,showToast}){
  const [exp,setExp]=useState({});
  const [editing,setEditing]=useState(null);
  const [ed,setEd]=useState({});
  const [addTo,setAddTo]=useState(null);
  const [np,setNp]=useState({name:"",code:"",unit:"",qty:"",pu:"",startDate:"",endDate:""});
  const can=user.role==="admin"||user.role==="supervisor";
  const togEx=id=>setExp(e=>({...e,[id]:!e[id]}));
  const startEd=pt=>{setEditing(pt.id);setEd({...pt});};
  const saveEd=()=>{onUpdate({...project,partidas:updPt(project.partidas,editing,()=>({...ed,avance:parseFloat(ed.avance)||0,qty:parseFloat(ed.qty)||0,pu:parseFloat(ed.pu)||0}))});setEditing(null);showToast("Guardado ✓");};
  const del=id=>{onUpdate({...project,partidas:delPt(project.partidas,id)});showToast("Eliminado");};
  const addChild=pid=>{const c={...np,id:"pt"+Date.now(),avance:0,qty:parseFloat(np.qty)||0,pu:parseFloat(np.pu)||0,children:[]};onUpdate({...project,partidas:updPt(project.partidas,pid,p=>({...p,children:[...(p.children||[]),c]}))});setAddTo(null);setNp({name:"",code:"",unit:"",qty:"",pu:"",startDate:"",endDate:""});showToast("Subpartida agregada ✓");};
  const addRoot=()=>{const pt={...np,id:"pt"+Date.now(),avance:0,qty:parseFloat(np.qty)||0,pu:parseFloat(np.pu)||0,children:[]};onUpdate({...project,partidas:[...project.partidas,pt]});setAddTo(null);setNp({name:"",code:"",unit:"",qty:"",pu:"",startDate:"",endDate:""});showToast("Partida agregada ✓");};

  const renderPt=(pt,lvl)=>{
    const dl=delay(pt.endDate,pt.avance),exp2=expiring(pt.endDate,pt.avance);
    const hasK=pt.children?.length>0,isEd=editing===pt.id;
    const lvlColor=dl>0?C.er:exp2?C.wa:lvl===0?BR.p:lvl===1?C.a:C.g3;
    return(
      <div key={pt.id} style={{marginLeft:lvl*12,marginBottom:8}}>
        <Card style={{padding:"10px 12px",borderLeft:"3px solid "+lvlColor}}>
          {isEd?(
            <>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                <Inp label="Código" value={ed.code||""} onChange={v=>setEd(d=>({...d,code:v}))}/>
                <Inp label="Unidad" value={ed.unit||""} onChange={v=>setEd(d=>({...d,unit:v}))}/>
              </div>
              <Inp label="Nombre" value={ed.name||""} onChange={v=>setEd(d=>({...d,name:v}))}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
                <Inp label="Cantidad" value={ed.qty||""} onChange={v=>setEd(d=>({...d,qty:v}))} type="number"/>
                <Inp label="P.U. S/" value={ed.pu||""} onChange={v=>setEd(d=>({...d,pu:v}))} type="number"/>
                <Inp label="Avance %" value={ed.avance||""} onChange={v=>setEd(d=>({...d,avance:v}))} type="number"/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                <Inp label="Inicio" value={ed.startDate||""} onChange={v=>setEd(d=>({...d,startDate:v}))} type="date"/>
                <Inp label="Fin progr." value={ed.endDate||""} onChange={v=>setEd(d=>({...d,endDate:v}))} type="date"/>
              </div>
              <div style={{display:"flex",gap:8}}>
                <Btn label="✓ Guardar" onClick={saveEd} sm col={C.ok}/>
                <Btn label="Cancelar" onClick={()=>setEditing(null)} sm out col={C.g5}/>
              </div>
            </>
          ):(
            <>
              <div style={{display:"flex",alignItems:"flex-start",gap:6}}>
                {hasK&&<button onClick={()=>togEx(pt.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.g5,fontSize:12,padding:"2px 0",flexShrink:0}}>{exp[pt.id]?"▼":"▶"}</button>}
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{flex:1,marginRight:6}}>
                      <span style={{fontSize:10,color:C.g4,fontWeight:600}}>{pt.code} </span>
                      <span style={{fontSize:lvl===0?13:12,fontWeight:lvl===0?700:600,color:C.g9}}>{pt.name}</span>
                    </div>
                    {!hasK&&<Pill label={pt.avance+"%"} color={pt.avance===100?C.ok:pt.avance>0?BR.p:C.g5} bg={pt.avance===100?C.okL:pt.avance>0?C.aL:C.g1} sz={10}/>}
                  </div>
                  {!hasK&&(
                    <>
                      <PBar v={pt.avance} col={pt.avance===100?C.ok:BR.p} h={4}/>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:4,alignItems:"center"}}>
                        {pt.pu>0&&<span style={{fontSize:10,color:C.g5}}>{pt.qty} {pt.unit} × {fmt(pt.pu)} = <b style={{color:C.g9}}>{fmtK(pt.qty*pt.pu)}</b></span>}
                        {pt.endDate&&<span style={{fontSize:10,color:C.g4}}>📅 {fmtD(pt.endDate)}</span>}
                        {dl>0&&<Pill label={"⚠ "+dl+"d retraso"} color={C.er} bg={C.erL} sz={9}/>}
                        {exp2&&dl===0&&<Pill label={"⏰ Por vencer"} color={C.wa} bg={C.waL} sz={9}/>}
                      </div>
                    </>
                  )}
                  {hasK&&(
                    <>
                      <PBar v={cPrg([pt])} col={BR.p} h={4}/>
                      <span style={{fontSize:10,color:C.g5,marginTop:3,display:"block"}}>{cPrg([pt])}% · {fmtK(cVal([pt]))}</span>
                    </>
                  )}
                </div>
              </div>
              {can&&(
                <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>
                  <button onClick={()=>startEd(pt)} style={{background:C.aL,border:"none",borderRadius:8,padding:"4px 10px",fontSize:10,color:BR.p,cursor:"pointer",fontWeight:600}}>✏️ Editar</button>
                  {lvl<2&&<button onClick={()=>setAddTo(pt.id)} style={{background:C.okL,border:"none",borderRadius:8,padding:"4px 10px",fontSize:10,color:C.ok,cursor:"pointer",fontWeight:600}}>+ Sub</button>}
                  <button onClick={()=>del(pt.id)} style={{background:C.erL,border:"none",borderRadius:8,padding:"4px 10px",fontSize:10,color:C.er,cursor:"pointer",fontWeight:600}}>🗑</button>
                </div>
              )}
              {addTo===pt.id&&(
                <div style={{marginTop:10,padding:10,background:C.g0,borderRadius:10}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.g7,marginBottom:8}}>Nueva subpartida de: {pt.name}</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                    <Inp label="Código" value={np.code} onChange={v=>setNp(d=>({...d,code:v}))}/>
                    <Inp label="Unidad" value={np.unit} onChange={v=>setNp(d=>({...d,unit:v}))}/>
                  </div>
                  <Inp label="Nombre *" value={np.name} onChange={v=>setNp(d=>({...d,name:v}))}/>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                    <Inp label="Cantidad" value={np.qty} onChange={v=>setNp(d=>({...d,qty:v}))} type="number"/>
                    <Inp label="P.U. S/" value={np.pu} onChange={v=>setNp(d=>({...d,pu:v}))} type="number"/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                    <Inp label="Inicio" value={np.startDate} onChange={v=>setNp(d=>({...d,startDate:v}))} type="date"/>
                    <Inp label="Fin" value={np.endDate} onChange={v=>setNp(d=>({...d,endDate:v}))} type="date"/>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <Btn label="Agregar" onClick={()=>addChild(pt.id)} sm col={C.ok}/>
                    <Btn label="Cancelar" onClick={()=>setAddTo(null)} sm out col={C.g5}/>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>
        {exp[pt.id]&&pt.children&&pt.children.map(c=>renderPt(c,lvl+1))}
      </div>
    );
  };

  return(
    <>
      {can&&(
        <div style={{marginBottom:12}}>
          {addTo==="root"?(
            <Card style={{marginBottom:8}}>
              <div style={{fontSize:12,fontWeight:700,color:C.g7,marginBottom:8}}>Nueva partida principal</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                <Inp label="Código" value={np.code} onChange={v=>setNp(d=>({...d,code:v}))}/>
                <Inp label="Unidad" value={np.unit} onChange={v=>setNp(d=>({...d,unit:v}))}/>
              </div>
              <Inp label="Nombre *" value={np.name} onChange={v=>setNp(d=>({...d,name:v}))}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                <Inp label="Cantidad" value={np.qty} onChange={v=>setNp(d=>({...d,qty:v}))} type="number"/>
                <Inp label="P.U. S/" value={np.pu} onChange={v=>setNp(d=>({...d,pu:v}))} type="number"/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                <Inp label="Inicio" value={np.startDate} onChange={v=>setNp(d=>({...d,startDate:v}))} type="date"/>
                <Inp label="Fin" value={np.endDate} onChange={v=>setNp(d=>({...d,endDate:v}))} type="date"/>
              </div>
              <div style={{display:"flex",gap:8}}>
                <Btn label="Agregar partida" onClick={addRoot} sm col={C.ok}/>
                <Btn label="Cancelar" onClick={()=>setAddTo(null)} sm out col={C.g5}/>
              </div>
            </Card>
          ):(
            <Btn label="+ Nueva partida principal" onClick={()=>setAddTo("root")} col={BR.p} full/>
          )}
        </div>
      )}
      <div style={{fontSize:11,color:C.g5,marginBottom:8}}>{project.partidas.length} capítulos · {leaves(project.partidas).length} partidas · Presupuesto: <b style={{color:C.g7}}>{fmtK(cBud(project.partidas))}</b></div>
      {project.partidas.map(pt=>renderPt(pt,0))}
    </>
  );
}

// Activos Tab
function ActivosTab({user,assets,projectId,onAdd,onToggle,showToast}){
  const pAss=assets.filter(a=>a.pid===projectId);
  const can=user.role==="admin"||user.role==="supervisor";
  const inst=pAss.filter(a=>a.ok).length,tot=pAss.length,pct=tot?Math.round(inst/tot*100):0;
  return(
    <>
      <Card style={{marginBottom:12,background:"linear-gradient(135deg,#0D2B6B,#1A7DC4)",border:"none"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{color:"white",fontSize:12,fontWeight:600}}>Activos instalados</div><div style={{color:"rgba(255,255,255,0.7)",fontSize:11}}>{inst} de {tot} instalados</div></div>
          <div style={{textAlign:"right"}}><div style={{color:"white",fontSize:22,fontWeight:800}}>{pct}%</div></div>
        </div>
        <div style={{marginTop:8,height:6,background:"rgba(255,255,255,0.15)",borderRadius:99,overflow:"hidden"}}>
          <div style={{width:pct+"%",height:"100%",background:"#C9A227",borderRadius:99}}/>
        </div>
      </Card>
      {can&&<div style={{marginBottom:12}}><Btn label="+ Agregar activo" onClick={onAdd} col={BR.p} full/></div>}
      {pAss.length===0&&<div style={{textAlign:"center",color:C.g4,fontSize:13,padding:"30px 0"}}>Sin activos registrados</div>}
      {pAss.map(a=>(
        <Card key={a.id} style={{marginBottom:10,borderLeft:"3px solid "+(a.ok?C.ok:C.er)}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
            <div style={{width:40,height:40,borderRadius:10,background:a.ok?C.okL:C.erL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{a.ok?"✅":"❌"}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div><div style={{fontSize:13,fontWeight:600,color:C.g9}}>{a.name}</div><div style={{fontSize:11,color:C.g5}}>{a.code} · {a.qty} {a.unit}</div></div>
                {can&&(
                  <button onClick={()=>{onToggle(a.id);showToast(a.ok?"Marcado como NO instalado":"Marcado como instalado ✓");}} style={{background:a.ok?C.erL:C.okL,border:"none",borderRadius:99,width:48,height:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:a.ok?"flex-end":"flex-start",padding:"2px 3px",flexShrink:0}}>
                    <div style={{width:20,height:20,borderRadius:99,background:C.w,boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
                  </button>
                )}
              </div>
              {a.loc&&<div style={{fontSize:11,color:C.g4,marginTop:3}}>📍 {a.loc}</div>}
              {a.obs&&<div style={{fontSize:11,color:C.wa,marginTop:2}}>⚠ {a.obs}</div>}
              {a.fecha&&<div style={{fontSize:10,color:C.g4,marginTop:2}}>Instalado: {fmtD(a.fecha)}</div>}
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

// Cuaderno Tab
function CuadernoTab({user,entries,onAdd,onEdit,showToast}){
  const [editId,setEditId]=useState(null);
  const [editTxt,setEditTxt]=useState("");
  const can=user.role==="admin"||user.role==="supervisor";
  const saveEdit=()=>{onEdit(editId,editTxt);setEditId(null);showToast("Entrada editada ✓");};
  return(
    <>
      {can&&<div style={{marginBottom:12}}><Btn label="+ Nueva entrada" onClick={onAdd} col={BR.p} full/></div>}
      <div style={{fontSize:11,color:C.g5,marginBottom:10}}>📓 Cuaderno de obra — registro cronológico. Solo accesible para supervisores y administrador.</div>
      {entries.length===0&&<div style={{textAlign:"center",color:C.g4,fontSize:13,padding:"30px 0"}}>Sin entradas en el cuaderno</div>}
      {entries.map(e=>(
        <Card key={e.id} style={{marginBottom:10,borderLeft:"3px solid "+BR.p}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
            <div><div style={{fontSize:11,fontWeight:700,color:BR.p}}>📅 {fmtD(e.fecha)} — {e.hora}</div></div>
            {e.photos>0&&<Pill label={"📷 "+e.photos} color={C.a} bg={C.aL} sz={10}/>}
          </div>
          {editId===e.id?(
            <>
              <textarea value={editTxt} onChange={ev=>setEditTxt(ev.target.value)} style={{width:"100%",border:"1.5px solid "+C.g2,borderRadius:8,padding:"8px 10px",fontSize:12,color:C.g9,background:C.g0,outline:"none",minHeight:80,resize:"none",boxSizing:"border-box"}}/>
              <div style={{display:"flex",gap:8,marginTop:8}}>
                <Btn label="✓ Guardar" onClick={saveEdit} sm col={C.ok}/>
                <Btn label="Cancelar" onClick={()=>setEditId(null)} sm out col={C.g5}/>
              </div>
            </>
          ):(
            <>
              <div style={{fontSize:12,color:C.g7,lineHeight:1.6}}>{e.nota}</div>
              {e.edit&&<div style={{fontSize:10,color:C.g4,marginTop:4}}>✏️ Editado por: {e.edit}</div>}
              {can&&(
                <button onClick={()=>{setEditId(e.id);setEditTxt(e.nota);}} style={{background:C.aL,border:"none",borderRadius:8,padding:"4px 10px",fontSize:10,color:BR.p,cursor:"pointer",fontWeight:600,marginTop:8}}>✏️ Editar</button>
              )}
            </>
          )}
        </Card>
      ))}
    </>
  );
}

// Adicionales Tab
function AdicionalesTab({user,adicionales,onAdd,onApprove,showToast}){
  const can=user.role==="admin";
  const total=adicionales.reduce((s,a)=>s+a.total,0);
  const approved=adicionales.filter(a=>a.status==="approved").reduce((s,a)=>s+a.total,0);
  return(
    <>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        <Card style={{padding:"12px 14px"}}><div style={{fontSize:11,color:C.g5}}>Total adicionales</div><div style={{fontSize:16,fontWeight:800,color:C.or}}>{fmtK(total)}</div></Card>
        <Card style={{padding:"12px 14px"}}><div style={{fontSize:11,color:C.g5}}>Aprobados</div><div style={{fontSize:16,fontWeight:800,color:C.ok}}>{fmtK(approved)}</div></Card>
      </div>
      {user.role!=="client"&&<div style={{marginBottom:12}}><Btn label="+ Registrar adicional" onClick={onAdd} col={C.or} full/></div>}
      {adicionales.length===0&&<div style={{textAlign:"center",color:C.g4,fontSize:13,padding:"30px 0"}}>Sin adicionales registrados</div>}
      {adicionales.map(a=>(
        <Card key={a.id} style={{marginBottom:10,borderLeft:"3px solid "+sCo(a.status)}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <Pill label={a.code} color={C.or} bg={C.orL} sz={10}/>
            <Pill label={sLb(a.status)} color={sCo(a.status)} bg={sBg(a.status)} sz={10}/>
          </div>
          <div style={{fontSize:13,fontWeight:600,color:C.g9,marginBottom:4}}>{a.name}</div>
          <div style={{fontSize:11,color:C.g5,marginBottom:6}}>{a.qty} {a.unit} × {fmt(a.pu)} = <b style={{color:C.g9,fontSize:12}}>{fmt(a.total)}</b></div>
          <div style={{fontSize:11,color:C.g5,background:C.g0,padding:"6px 10px",borderRadius:8,marginBottom:6}}>Motivo: {a.motivo}</div>
          <div style={{fontSize:10,color:C.g4}}>📅 {fmtD(a.fecha)}</div>
          {can&&a.status==="pending"&&(
            <div style={{display:"flex",gap:8,marginTop:10}}>
              <Btn label="✓ Aprobar" onClick={()=>{onApprove(a.id,"approved");showToast("Adicional aprobado ✓");}} sm col={C.ok}/>
              <Btn label="✗ Rechazar" onClick={()=>{onApprove(a.id,"rejected");showToast("Adicional rechazado");}} sm out col={C.er}/>
            </div>
          )}
        </Card>
      ))}
    </>
  );
}

// Docs Tab
function DocsTab({user,project,onUpdateDrive}){
  const [url,setUrl]=useState(project.driveUrl||"");
  const [editing,setEditing]=useState(false);
  const carpetas=["Planos","Especificaciones Técnicas","Memorias","Estudios","Valorizaciones","Adicionales","Cuaderno de Obra"];
  return(
    <>
      <Card style={{marginBottom:12,background:C.aL,borderColor:C.a}}>
        <div style={{fontSize:12,fontWeight:700,color:BR.p,marginBottom:8}}>🔗 URL de documentos del proyecto</div>
        {editing?(
          <>
            <Inp label="URL Google Drive" value={url} onChange={setUrl} ph="https://drive.google.com/drive/folders/..."/>
            <div style={{display:"flex",gap:8}}>
              <Btn label="✓ Guardar" onClick={()=>{onUpdateDrive(url);setEditing(false);}} sm col={C.ok}/>
              <Btn label="Cancelar" onClick={()=>setEditing(false)} sm out col={C.g5}/>
            </div>
          </>
        ):(
          <>
            <div style={{fontSize:12,color:C.g7,wordBreak:"break-all",marginBottom:8}}>{url||"Sin URL configurada"}</div>
            {(user.role==="admin"||user.role==="supervisor")&&<button onClick={()=>setEditing(true)} style={{background:BR.p,color:C.w,border:"none",borderRadius:8,padding:"6px 12px",fontSize:11,fontWeight:600,cursor:"pointer"}}>✏️ Editar URL</button>}
            {url&&<a href={url} target="_blank" rel="noreferrer" style={{display:"inline-block",marginLeft:8,background:C.ok,color:C.w,borderRadius:8,padding:"6px 12px",fontSize:11,fontWeight:600,textDecoration:"none"}}>↗ Abrir Drive</a>}
          </>
        )}
      </Card>
      <div style={{fontSize:12,fontWeight:700,color:C.g7,marginBottom:8}}>📂 Estructura de carpetas</div>
      {carpetas.map((c,i)=>(
        <Card key={i} style={{marginBottom:8,padding:"10px 14px",display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:22}}>📁</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.g9}}>{c}</div><div style={{fontSize:11,color:C.g4}}>Carpeta en Google Drive</div></div>
          {url&&<a href={url} target="_blank" rel="noreferrer" style={{background:C.aL,color:BR.p,border:"1px solid "+C.a,borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:600,textDecoration:"none"}}>↗</a>}
        </Card>
      ))}
    </>
  );
}

// Valorización Tab
function ValTab({user,project,advances,adicionales,onApprove,onNewAdv,showToast}){
  const leaves2=leaves(project.partidas);
  const addApproved=adicionales.filter(a=>a.status==="approved").reduce((s,a)=>s+a.total,0);
  const valBase=cVal(project.partidas);
  const budget=cBud(project.partidas);
  const can=user.role==="admin";
  const COLS=["#0D2B6B","#1A7DC4","#15803D","#B45309","#DC2626","#6366F1"];
  const pieData=project.partidas.map((p,i)=>({name:p.code,value:cVal([p]),fill:COLS[i%6]})).filter(d=>d.value>0);
  return(
    <>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        {[{l:"Presupuesto base",v:fmtK(budget),c:C.g7},{l:"Valorizado",v:fmtK(valBase),c:BR.p},{l:"Adicionales aprobados",v:fmtK(addApproved),c:C.or},{l:"Total c/Adic.",v:fmtK(valBase+addApproved),c:C.ok}].map((k,i)=>(
          <Card key={i} style={{padding:"10px 12px"}}><div style={{fontSize:11,color:C.g5}}>{k.l}</div><div style={{fontSize:15,fontWeight:800,color:k.c}}>{k.v}</div></Card>
        ))}
      </div>
      <Card style={{marginBottom:10,padding:"10px 6px"}}>
        <div style={{fontSize:11,fontWeight:700,color:C.g7,marginBottom:8,paddingLeft:6}}>Distribución por capítulo</div>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={pieData} margin={{left:-25,right:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.g1}/>
            <XAxis dataKey="name" tick={{fontSize:9,fill:C.g4}}/>
            <YAxis tick={{fontSize:9,fill:C.g4}}/>
            <Tooltip formatter={v=>[fmtK(v),"Valorizado"]}/>
            <Bar dataKey="value" radius={[4,4,0,0]}>{pieData.map((d,i)=><Cell key={i} fill={d.fill}/>)}</Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      {user.role!=="client"&&<div style={{marginBottom:12}}><Btn label="+ Registrar avance" onClick={onNewAdv} col={BR.p} full/></div>}
      <div style={{fontSize:12,fontWeight:700,color:C.g7,marginBottom:8}}>Avances registrados</div>
      {advances.length===0&&<div style={{textAlign:"center",color:C.g4,fontSize:13,padding:"20px 0"}}>Sin avances registrados</div>}
      {advances.sort((a,b)=>new Date(b.fecha)-new Date(a.fecha)).map(a=>{
        const pt=leaves2.find(p=>p.id===a.ptid)||flatten(project.partidas).find(p=>p.id===a.ptid);
        const valAdv=pt?(pt.qty||0)*(pt.pu||0)*a.pct/100:0;
        return(
          <Card key={a.id} style={{marginBottom:8,borderLeft:"3px solid "+sCo(a.status)}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:11,color:C.g4}}>📅 {fmtD(a.fecha)}</span>
              <Pill label={sLb(a.status)} color={sCo(a.status)} bg={sBg(a.status)} sz={10}/>
            </div>
            <div style={{fontSize:12,fontWeight:600,color:C.g9,marginBottom:4}}>{pt?.name||"Partida"}</div>
            <div style={{display:"flex",gap:10,marginBottom:6}}>
              <span style={{fontSize:12,color:C.g5}}>📈 <b>{a.pct}%</b></span>
              <span style={{fontSize:12,color:C.g5}}>💰 <b>{fmtK(valAdv)}</b></span>
              <span style={{fontSize:12,color:C.g5}}>📷 <b>{a.photos}</b></span>
            </div>
            {a.obs&&<div style={{fontSize:11,color:C.g5,background:C.g0,padding:"6px 10px",borderRadius:8}}>{a.obs}</div>}
            {can&&a.status==="pending"&&(
              <div style={{display:"flex",gap:8,marginTop:8}}>
                <Btn label="✓ Aprobar" onClick={()=>{onApprove(a.id,"approved");showToast("Aprobado ✓");}} sm col={C.ok}/>
                <Btn label="✗ Rechazar" onClick={()=>{onApprove(a.id,"rejected");showToast("Rechazado");}} sm out col={C.er}/>
              </div>
            )}
          </Card>
        );
      })}
    </>
  );
}

// Project Detail
function ProjDetail({user,project,advances,assets,obra,adicionales,onBack,onNav,onUpdateProj,onApprove,onToggleAsset,onAddAsset,onAddObra,onEditObra,onAddAdic,onApproveAdic}){
  const [tab,setTab]=useState("resumen");
  const [modal,setModal]=useState(null);
  const [toast,setToast]=useState("");
  const [newAdv,setNewAdv]=useState(null);
  const showToast=m=>{setToast(m);setTimeout(()=>setToast(""),2200);};
  const pAdv=advances.filter(a=>a.pid===project.id);
  const prg=cPrg(project.partidas),val=cVal(project.partidas),bud=cBud(project.partidas);
  const pAdic=adicionales.filter(a=>a.pid===project.id);
  const pObra=obra.filter(o=>o.pid===project.id).sort((a,b)=>(b.fecha+b.hora).localeCompare(a.fecha+a.hora));
  const addApproved=pAdic.filter(a=>a.status==="approved").reduce((s,a)=>s+a.total,0);
  const TABS=[{id:"resumen",ic:"📊",l:"Resumen"},{id:"partidas",ic:"📋",l:"Partidas"},{id:"activos",ic:"⚙️",l:"Activos"},{id:"cuaderno",ic:"📓",l:"Cuaderno"},{id:"val",ic:"💰",l:"Valor."},{id:"docs",ic:"📁",l:"Docs"},{id:"adic",ic:"➕",l:"Adic."}];
  const dels=leaves(project.partidas).filter(pt=>delay(pt.endDate,pt.avance)>0);

  if(newAdv)return(
    <NewAdvanceScreen user={user} project={project} onBack={()=>setNewAdv(null)} onSave={d=>{newAdv(d);setNewAdv(null);}}/>
  );

  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:C.g0,overflow:"hidden",position:"relative"}}>
      <TBar title={project.name} sub={project.code+" · "+project.discipline} onBack={onBack} user={user}/>
      <div style={{background:C.w,borderBottom:"1px solid "+C.g2,display:"flex",overflowX:"auto",flexShrink:0,padding:"0 4px"}}>
        {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",padding:"9px 10px",fontSize:10,fontWeight:tab===t.id?700:400,color:tab===t.id?BR.p:C.g5,borderBottom:tab===t.id?"2.5px solid "+BR.p:"2.5px solid transparent",cursor:"pointer",whiteSpace:"nowrap",marginBottom:-1,display:"flex",alignItems:"center",gap:3}}>{t.ic} {t.l}</button>)}
      </div>
      <Scrl style={{padding:"12px 14px"}}>
        {tab==="resumen"&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              {[{l:"Avance global",v:prg+"%",ic:"📈",c:prg<50?C.wa:C.ok},{l:"Valorizado",v:fmtK(val),ic:"💰",c:BR.p},{l:"Presupuesto",v:fmtK(bud),ic:"📋",c:C.g7},{l:"Adicionales",v:fmtK(addApproved),ic:"➕",c:C.or}].map((k,i)=>(
                <Card key={i} style={{padding:"12px 14px"}}><span style={{fontSize:18}}>{k.ic}</span><div style={{fontSize:17,fontWeight:800,color:k.c,marginTop:4}}>{k.v}</div><div style={{fontSize:11,color:C.g5}}>{k.l}</div></Card>
              ))}
            </div>
            <Card style={{marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:700,color:C.g7,marginBottom:6}}>AVANCE GENERAL</div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:11,color:C.g5}}>Avance físico: <b style={{color:prg<50?C.wa:C.ok}}>{prg}%</b></span>
                <span style={{fontSize:11,color:C.g5}}>Valorizado: <b style={{color:BR.p}}>{Math.round(val/bud*100)}%</b></span>
              </div>
              <PBar v={prg} col={prg<50?C.wa:BR.p} h={10}/>
              <div style={{marginTop:8}}><PBar v={Math.round(val/bud*100)} col={BR.a} h={6}/></div>
              <div style={{display:"flex",gap:16,marginTop:4}}>
                <span style={{fontSize:9,color:C.g4}}>■ Avance físico</span>
                <span style={{fontSize:9,color:C.a}}>■ % Valorizado</span>
              </div>
            </Card>
            <Card style={{marginBottom:10,padding:"10px 6px"}}>
              <div style={{fontSize:11,fontWeight:700,color:C.g7,marginBottom:6,paddingLeft:6}}>AVANCE POR CAPÍTULO</div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={project.partidas.map(p=>({n:p.code,v:p.children?.length?cPrg([p]):p.avance}))} margin={{left:-25,right:5}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.g1}/>
                  <XAxis dataKey="n" tick={{fontSize:9,fill:C.g4}}/>
                  <YAxis tick={{fontSize:9,fill:C.g4}} domain={[0,100]}/>
                  <Tooltip formatter={v=>[v+"%","Avance"]}/>
                  <Bar dataKey="v" radius={[4,4,0,0]}>{project.partidas.map((_,i)=><Cell key={i} fill={["#0D2B6B","#1A7DC4","#15803D","#B45309","#DC2626","#6366F1"][i%6]}/>)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card style={{marginBottom:10}}>
              {[["Cliente",project.client],["Ubicación",project.location],["Inicio",fmtD(project.startDate)],["Fin previsto",fmtD(project.endDate)]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid "+C.g1}}>
                  <span style={{fontSize:12,color:C.g5}}>{k}</span><span style={{fontSize:12,fontWeight:600,color:C.g7,maxWidth:"58%",textAlign:"right"}}>{v}</span>
                </div>
              ))}
            </Card>
            {dels.length>0?(
              <Card style={{borderLeft:"3px solid "+C.er}}>
                <div style={{fontSize:12,fontWeight:700,color:C.er,marginBottom:8}}>⚠ {dels.length} partida{dels.length>1?"s":""} con retraso</div>
                {dels.slice(0,5).map(pt=>(
                  <div key={pt.id} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid "+C.g1}}>
                    <span style={{fontSize:11,color:C.g7,flex:1,marginRight:8}}>{pt.code} {pt.name}</span>
                    <Pill label={delay(pt.endDate,pt.avance)+"d"} color={C.er} bg={C.erL} sz={10}/>
                  </div>
                ))}
              </Card>
            ):(
              <Card style={{background:C.okL,border:"1px solid "+C.ok+"30"}}><div style={{fontSize:12,color:C.ok,fontWeight:600}}>✅ Sin retrasos</div></Card>
            )}
          </>
        )}
        {tab==="partidas"&&<PartTab user={user} project={project} onUpdate={onUpdateProj} showToast={showToast}/>}
        {tab==="activos"&&<ActivosTab user={user} assets={assets} projectId={project.id} onAdd={()=>setModal("asset")} onToggle={id=>{onToggleAsset(id);showToast("Activo actualizado ✓");}} showToast={showToast}/>}
        {tab==="cuaderno"&&<CuadernoTab user={user} entries={pObra} onAdd={()=>setModal("obra")} onEdit={(id,txt)=>onEditObra(id,txt,user.name)} showToast={showToast}/>}
        {tab==="val"&&<ValTab user={user} project={project} advances={pAdv} adicionales={pAdic} onApprove={onApprove} onNewAdv={()=>setModal("adv")} showToast={showToast}/>}
        {tab==="docs"&&<DocsTab user={user} project={project} onUpdateDrive={url=>{onUpdateProj({...project,driveUrl:url});showToast("URL guardada ✓");}}/>}
        {tab==="adic"&&<AdicionalesTab user={user} adicionales={pAdic} onAdd={()=>setModal("adic")} onApprove={(id,st)=>{onApproveAdic(id,st);showToast(st==="approved"?"Aprobado ✓":"Rechazado");}} showToast={showToast}/>}
        <div style={{height:10}}/>
      </Scrl>
      {modal==="asset"&&(
        <Mdl title="Nuevo activo" onClose={()=>setModal(null)}>
          <NewAssetForm onSave={a=>{onAddAsset({...a,id:"s"+Date.now(),pid:project.id,ok:false,fecha:""});setModal(null);showToast("Activo agregado ✓");}}/>
        </Mdl>
      )}
      {modal==="obra"&&(
        <Mdl title="Nueva entrada cuaderno" onClose={()=>setModal(null)}>
          <NewObraForm onSave={e=>{onAddObra({...e,id:"o"+Date.now(),pid:project.id,reg:user.id,edit:null});setModal(null);showToast("Entrada registrada ✓");}}/>
        </Mdl>
      )}
      {modal==="adv"&&(
        <Mdl title="Registrar avance" onClose={()=>setModal(null)}>
          <NewAdvForm user={user} project={project} onSave={a=>{onApprove(null,null,{...a,id:"v"+Date.now(),pid:project.id,reg:user.id,status:"pending"});setModal(null);showToast("Avance registrado ✓");}}/>
        </Mdl>
      )}
      {modal==="adic"&&(
        <Mdl title="Nuevo adicional" onClose={()=>setModal(null)}>
          <NewAdicForm onSave={a=>{onAddAdic({...a,id:"d"+Date.now(),pid:project.id,status:"pending",total:parseFloat(a.qty||0)*parseFloat(a.pu||0)});setModal(null);showToast("Adicional registrado ✓");}}/>
        </Mdl>
      )}
      <Toast msg={toast}/>
      <NavBar active="projects" onNav={onNav} role={user.role}/>
    </div>
  );
}

// Mini forms inside modals
function NewAssetForm({onSave}){
  const [d,setD]=useState({name:"",code:"",qty:"1",unit:"und",loc:"",obs:""});
  const u=k=>v=>setD(x=>({...x,[k]:v}));
  return(<>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><Inp label="Código" value={d.code} onChange={u("code")}/><Inp label="Unidad" value={d.unit} onChange={u("unit")}/></div>
    <Inp label="Nombre *" value={d.name} onChange={u("name")}/>
    <Inp label="Cantidad" value={d.qty} onChange={u("qty")} type="number"/>
    <Inp label="Ubicación en obra" value={d.loc} onChange={u("loc")}/>
    <Inp label="Observaciones" value={d.obs} onChange={u("obs")}/>
    <Btn label="Agregar activo" onClick={()=>d.name&&onSave(d)} col={C.ok} full/>
  </>);
}
function NewObraForm({onSave}){
  const now=new Date();
  const hoy=now.toISOString().split("T")[0];
  const hora=now.getHours().toString().padStart(2,"0")+":"+now.getMinutes().toString().padStart(2,"0");
  const [d,setD]=useState({fecha:hoy,hora,nota:"",photos:0});
  const u=k=>v=>setD(x=>({...x,[k]:v}));
  return(<>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><Inp label="Fecha" value={d.fecha} onChange={u("fecha")} type="date"/><Inp label="Hora" value={d.hora} onChange={u("hora")} type="time"/></div>
    <div style={{marginBottom:10}}><div style={{fontSize:11,color:C.g5,fontWeight:600,marginBottom:4}}>Entrada del cuaderno</div><textarea value={d.nota} onChange={e=>setD(x=>({...x,nota:e.target.value}))} placeholder="Describe las actividades realizadas, personal, condiciones, incidentes..." style={{width:"100%",border:"1.5px solid "+C.g2,borderRadius:10,padding:"10px 12px",fontSize:13,color:C.g9,background:C.g0,outline:"none",minHeight:100,resize:"none",boxSizing:"border-box"}}/></div>
    <div style={{marginBottom:12}}>
      <div style={{fontSize:11,color:C.g5,fontWeight:600,marginBottom:6}}>Fotos de campo</div>
      <button onClick={()=>setD(x=>({...x,photos:x.photos+1}))} style={{background:C.aL,border:"1px dashed "+C.a,borderRadius:10,padding:"10px 16px",width:"100%",cursor:"pointer",fontSize:12,color:BR.p,fontWeight:600}}>📷 Agregar foto ({d.photos})</button>
    </div>
    <Btn label="✓ Registrar entrada" onClick={()=>d.nota&&onSave(d)} col={BR.p} full/>
  </>);
}
function NewAdvForm({user,project,onSave}){
  const ls=leaves(project.partidas);
  const [d,setD]=useState({ptid:ls[0]?.id||"",pct:"0",obs:"",photos:0});
  const u=k=>v=>setD(x=>({...x,[k]:v}));
  const pt=ls.find(p=>p.id===d.ptid);
  return(<>
    <Sel label="Partida" value={d.ptid} onChange={u("ptid")} opts={ls.map(p=>[p.id,p.code+" - "+p.name.slice(0,30)])}/>
    {pt&&<div style={{fontSize:11,color:C.g5,marginBottom:10,background:C.g0,padding:"6px 10px",borderRadius:8}}>Avance actual: <b>{pt.avance}%</b> · {pt.qty} {pt.unit} × {fmt(pt.pu)}</div>}
    <div style={{marginBottom:10}}>
      <div style={{fontSize:11,color:C.g5,fontWeight:600,marginBottom:6}}>Avance: <b style={{color:BR.p}}>{d.pct}%</b></div>
      <input type="range" min="0" max="100" value={d.pct} onChange={e=>u("pct")(e.target.value)} style={{width:"100%",accentColor:BR.p}}/>
      <PBar v={parseInt(d.pct)} col={BR.p} h={6}/>
    </div>
    <div style={{marginBottom:10}}><div style={{fontSize:11,color:C.g5,fontWeight:600,marginBottom:4}}>Observaciones</div><textarea value={d.obs} onChange={e=>u("obs")(e.target.value)} placeholder="Estado, condiciones, incidencias..." style={{width:"100%",border:"1.5px solid "+C.g2,borderRadius:10,padding:"9px 12px",fontSize:13,outline:"none",minHeight:70,resize:"none",boxSizing:"border-box",background:C.g0}}/></div>
    <button onClick={()=>setD(x=>({...x,photos:x.photos+1}))} style={{background:C.aL,border:"1px dashed "+C.a,borderRadius:10,padding:"8px 16px",width:"100%",cursor:"pointer",fontSize:12,color:BR.p,fontWeight:600,marginBottom:10}}>📷 Agregar foto ({d.photos})</button>
    <Btn label="✓ Registrar avance" onClick={()=>onSave({...d,fecha:new Date().toISOString().split("T")[0]})} col={BR.p} full/>
  </>);
}
function NewAdicForm({onSave}){
  const [d,setD]=useState({code:"AD-00"+(Date.now()%100),name:"",unit:"",qty:"",pu:"",motivo:"",fecha:new Date().toISOString().split("T")[0]});
  const u=k=>v=>setD(x=>({...x,[k]:v}));
  return(<>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><Inp label="Código" value={d.code} onChange={u("code")}/><Inp label="Unidad" value={d.unit} onChange={u("unit")}/></div>
    <Inp label="Descripción *" value={d.name} onChange={u("name")}/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><Inp label="Cantidad" value={d.qty} onChange={u("qty")} type="number"/><Inp label="Precio Unitario S/" value={d.pu} onChange={u("pu")} type="number"/></div>
    {d.qty&&d.pu&&<div style={{fontSize:12,color:BR.p,fontWeight:700,marginBottom:10}}>Total: {fmtK(parseFloat(d.qty)*parseFloat(d.pu))}</div>}
    <div style={{marginBottom:10}}><div style={{fontSize:11,color:C.g5,fontWeight:600,marginBottom:4}}>Motivo / Sustento</div><textarea value={d.motivo} onChange={e=>u("motivo")(e.target.value)} placeholder="Causa que origina el adicional..." style={{width:"100%",border:"1.5px solid "+C.g2,borderRadius:10,padding:"9px 12px",fontSize:13,outline:"none",minHeight:70,resize:"none",boxSizing:"border-box",background:C.g0}}/></div>
    <Inp label="Fecha" value={d.fecha} onChange={u("fecha")} type="date"/>
    <Btn label="✓ Registrar adicional" onClick={()=>d.name&&d.qty&&onSave(d)} col={C.or} full/>
  </>);
}

// Users Management
function UsersMgmt({user,users,setUsers,projects,onNav}){
  const [view,setView]=useState("list");
  const [selU,setSelU]=useState(null);
  const [modal,setModal]=useState(null);
  const [toast,setToast]=useState("");
  const showToast=m=>{setToast(m);setTimeout(()=>setToast(""),2000);};
  const [filter,setFilter]=useState("all");
  const [newUser,setNewUser]=useState({name:"",email:"",pass:"",role:"supervisor",company:""});

  const toggleProj=(uid,pid)=>{
    setUsers(prev=>prev.map(u2=>{
      if(u2.id!==uid)return u2;
      const has=u2.ap.includes(pid);
      return{...u2,ap:has?u2.ap.filter(p=>p!==pid):[...u2.ap,pid]};
    }));
    const p=projects.find(x=>x.id===pid);
    showToast((users.find(u2=>u2.id===uid)?.ap.includes(pid)?"Desasignado: ":"Asignado: ")+p?.name);
  };

  const addUser=()=>{
    if(!newUser.name||!newUser.email)return;
    const nm={...newUser,id:"u"+Date.now(),avatar:newUser.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(),ap:[]};
    setUsers(prev=>[...prev,nm]);setModal(null);setNewUser({name:"",email:"",pass:"",role:"supervisor",company:""});showToast("Usuario creado ✓");
  };

  const others=users.filter(u2=>u2.id!==user.id&&(filter==="all"||u2.role===filter));

  if(view==="edit"&&selU){
    const u2=users.find(x=>x.id===selU);
    return(
      <div style={{flex:1,display:"flex",flexDirection:"column",background:C.g0,overflow:"hidden",position:"relative"}}>
        <TBar title="Asignar proyectos" sub={u2?.name} onBack={()=>setView("list")} user={user}/>
        <Scrl style={{padding:"14px"}}>
          <Card style={{marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:46,height:46,borderRadius:23,background:rBg(u2.role),display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:rCo(u2.role)}}>{u2.avatar}</div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:C.g9}}>{u2.name}</div>
              <div style={{fontSize:12,color:C.g5}}>{u2.email}</div>
              <div style={{marginTop:4}}><Pill label={rLb(u2.role)} color={rCo(u2.role)} bg={rBg(u2.role)}/></div>
            </div>
          </Card>
          <div style={{fontSize:12,color:C.g5,marginBottom:12,background:C.aL,padding:"8px 12px",borderRadius:10,borderLeft:"3px solid "+C.a}}>
            {u2.role==="client"?"El cliente solo verá los proyectos que actives.":"El supervisor solo registrará avances en proyectos asignados."}
          </div>
          {projects.map(p=>{
            const assigned=u2.ap.includes(p.id),prg=cPrg(p.partidas);
            return(
              <Card key={p.id} style={{marginBottom:10,borderColor:assigned?BR.p:C.g2,borderWidth:assigned?2:1}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:40,height:40,borderRadius:10,background:assigned?C.aL:C.g1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🏗️</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:C.g9}}>{p.name}</div>
                    <div style={{fontSize:11,color:C.g5}}>{p.code} · {prg}% avance</div>
                  </div>
                  <button onClick={()=>toggleProj(u2.id,p.id)} style={{background:assigned?BR.p:C.w,border:"2px solid "+(assigned?BR.p:C.g3),borderRadius:99,width:48,height:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:assigned?"flex-end":"flex-start",padding:"2px 3px",flexShrink:0,transition:"all .2s"}}>
                    <div style={{width:20,height:20,borderRadius:99,background:C.w,boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
                  </button>
                </div>
                {assigned&&<div style={{marginTop:8}}><PBar v={prg} col={BR.p} h={4}/></div>}
              </Card>
            );
          })}
          <div style={{marginTop:8,background:C.okL,borderRadius:12,padding:"10px 14px"}}>
            <div style={{fontSize:12,fontWeight:700,color:C.ok,marginBottom:4}}>Proyectos asignados: {u2.ap.length}</div>
            {u2.ap.map(pid=>{const p=projects.find(x=>x.id===pid);return p?<div key={pid} style={{fontSize:11,color:C.ok}}>✓ {p.name}</div>:null;})}
            {u2.ap.length===0&&<div style={{fontSize:11,color:C.g5}}>Ninguno asignado</div>}
          </div>
          <div style={{height:10}}/>
        </Scrl>
        <Toast msg={toast}/>
        <div style={{padding:"12px 14px",background:C.w,borderTop:"1px solid "+C.g2,flexShrink:0}}>
          <Btn label="✓ Listo" onClick={()=>setView("list")} col={C.ok} full/>
        </div>
      </div>
    );
  }

  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:C.g0,overflow:"hidden",position:"relative"}}>
      <TBar title="Usuarios" sub={users.length+" registrados"} user={user}
        right={<button onClick={()=>setModal("new")} style={{background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:10,padding:"6px 12px",color:"white",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Nuevo</button>}/>
      <div style={{background:C.w,borderBottom:"1px solid "+C.g2,padding:"8px 14px",display:"flex",gap:8,flexShrink:0}}>
        {[["all","Todos"],["supervisor","Supervisores"],["client","Clientes"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setFilter(id)} style={{background:filter===id?BR.p:C.g1,color:filter===id?"white":C.g5,border:"none",borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{lbl}</button>
        ))}
      </div>
      <Scrl style={{padding:"10px 14px"}}>
        {others.map(u2=>(
          <Card key={u2.id} style={{marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:44,height:44,borderRadius:22,background:rBg(u2.role),display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:rCo(u2.role),flexShrink:0}}>{u2.avatar}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:C.g9}}>{u2.name}</div>
                <div style={{fontSize:11,color:C.g5}}>{u2.company}</div>
                <div style={{fontSize:10,color:C.g4}}>{u2.email}</div>
                <div style={{display:"flex",gap:8,marginTop:6,alignItems:"center"}}>
                  <Pill label={rLb(u2.role)} color={rCo(u2.role)} bg={rBg(u2.role)} sz={10}/>
                  <span style={{fontSize:11,color:u2.ap.length>0?C.ok:C.g4,fontWeight:600}}>{u2.ap.length>0?"✓ "+u2.ap.length+" proyecto"+(u2.ap.length>1?"s":""):"Sin proyectos"}</span>
                </div>
              </div>
              <button onClick={()=>{setSelU(u2.id);setView("edit");}} style={{background:C.aL,border:"1px solid "+C.a,borderRadius:10,padding:"7px 12px",color:BR.p,fontSize:11,fontWeight:600,cursor:"pointer"}}>Gestionar</button>
            </div>
          </Card>
        ))}
        <div style={{height:8}}/>
      </Scrl>
      {modal==="new"&&(
        <Mdl title="Nuevo usuario" onClose={()=>setModal(null)}>
          <Inp label="Nombre completo *" value={newUser.name} onChange={v=>setNewUser(x=>({...x,name:v}))}/>
          <Inp label="Correo electrónico *" value={newUser.email} onChange={v=>setNewUser(x=>({...x,email:v}))} type="email"/>
          <Inp label="Contraseña" value={newUser.pass} onChange={v=>setNewUser(x=>({...x,pass:v}))} type="password"/>
          <Inp label="Empresa" value={newUser.company} onChange={v=>setNewUser(x=>({...x,company:v}))}/>
          <Sel label="Rol" value={newUser.role} onChange={v=>setNewUser(x=>({...x,role:v}))} opts={[["supervisor","Supervisor"],["client","Cliente"]]}/>
          <Btn label="✓ Crear usuario" onClick={addUser} col={C.ok} full/>
        </Mdl>
      )}
      <Toast msg={toast}/>
      <NavBar active="users" onNav={onNav} role={user.role}/>
    </div>
  );
}

// Reports
function Reports({user,projects,advances,onNav}){
  const mine=user.role==="admin"?projects:projects.filter(p=>user.ap.includes(p.id));
  const [sel,setSel]=useState(mine[0]?.id||"");
  const proj=mine.find(p=>p.id===sel)||mine[0];
  if(!proj)return(<div style={{flex:1,display:"flex",flexDirection:"column",background:C.g0,overflow:"hidden"}}><TBar title="Reportes" user={user}/><div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:C.g4}}>Sin proyectos</div><NavBar active="chart" onNav={onNav} role={user.role}/></div>);
  const val=cVal(proj.partidas),bud=cBud(proj.partidas),prg=cPrg(proj.partidas);
  const curva=[{m:"Mar",p:5,e:4},{m:"Abr",p:10,e:9},{m:"May",p:18,e:15},{m:"Jun",p:27,e:22},{m:"Jul",p:36,e:30},{m:"Ago",p:45,e:38},{m:"Sep",p:52,e:47},{m:"Oct",p:58,e:54},{m:"Nov",p:65,e:62},{m:"Dic",p:70,e:62},{m:"Ene",p:78,e:prg}];
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:C.g0,overflow:"hidden"}}>
      <TBar title="Reportes" user={user}/>
      <div style={{padding:"10px 14px 6px",background:C.w,borderBottom:"1px solid "+C.g2,flexShrink:0}}>
        <select value={sel} onChange={e=>setSel(e.target.value)} style={{width:"100%",border:"1.5px solid "+C.g2,borderRadius:10,padding:"8px 12px",fontSize:13,color:C.g9,background:C.g0,outline:"none"}}>
          {mine.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      <Scrl style={{padding:"12px 14px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
          {[{l:"Avance",v:prg+"%",c:prg<50?C.wa:C.ok},{l:"Valorizado",v:fmtK(val),c:BR.p},{l:"Presupuesto",v:fmtK(bud),c:C.g7},{l:"% Valorizado",v:Math.round(val/bud*100)+"%",c:C.a}].map((k,i)=>(
            <Card key={i} style={{padding:"10px 12px"}}><div style={{fontSize:11,color:C.g5}}>{k.l}</div><div style={{fontSize:16,fontWeight:800,color:k.c}}>{k.v}</div></Card>
          ))}
        </div>
        <div style={{fontSize:12,fontWeight:700,color:C.g7,marginBottom:8}}>📈 Curva S — Avance programado vs ejecutado</div>
        <Card style={{padding:"12px 6px 8px",marginBottom:12}}>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={curva} margin={{left:-20,right:8}}>
              <defs>
                <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.g3} stopOpacity={0.3}/><stop offset="95%" stopColor={C.g3} stopOpacity={0}/></linearGradient>
                <linearGradient id="gE" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={BR.p} stopOpacity={0.3}/><stop offset="95%" stopColor={BR.p} stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.g2}/>
              <XAxis dataKey="m" tick={{fontSize:10,fill:C.g4}}/>
              <YAxis tick={{fontSize:10,fill:C.g4}}/>
              <Tooltip formatter={(v,n)=>[v+"%",n==="p"?"Programado":"Ejecutado"]}/>
              <Area type="monotone" dataKey="p" stroke={C.g4} fill="url(#gP)" strokeWidth={2} strokeDasharray="5 5" name="p"/>
              <Area type="monotone" dataKey="e" stroke={BR.p} fill="url(#gE)" strokeWidth={2.5} name="e"/>
            </AreaChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:16,justifyContent:"center",marginTop:4}}>
            <span style={{fontSize:10,color:C.g4}}>- - Programado</span>
            <span style={{fontSize:10,color:BR.p}}>—— Ejecutado</span>
          </div>
        </Card>
        <div style={{fontSize:12,fontWeight:700,color:C.g7,marginBottom:8}}>📄 Exportar</div>
        {[{ic:"📊",l:"Valorización mensual",s:"PDF con tabla de partidas"},{ic:"📷",l:"Informe fotográfico",s:"PDF con fotos por partida"},{ic:"📋",l:"Reporte ejecutivo",s:"Resumen para cliente"},{ic:"⚠️",l:"Reporte de retrasos",s:"Partidas con atraso y días"}].map((r,i)=>(
          <Card key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",marginBottom:8}}>
            <span style={{fontSize:22}}>{r.ic}</span>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:C.g9}}>{r.l}</div><div style={{fontSize:11,color:C.g4}}>{r.s}</div></div>
            <button style={{background:C.aL,color:BR.p,border:"1px solid "+C.a,borderRadius:8,padding:"6px 10px",fontSize:11,fontWeight:600,cursor:"pointer"}}>PDF</button>
          </Card>
        ))}
        <div style={{height:8}}/>
      </Scrl>
      <NavBar active="chart" onNav={onNav} role={user.role}/>
    </div>
  );
}

// Profile
function Profile({user,onLogout,onNav}){
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:C.g0,overflow:"hidden"}}>
      <TBar title="Mi perfil" user={user}/>
      <Scrl style={{padding:"16px 14px"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:20}}>
          <div style={{width:78,height:78,borderRadius:39,background:"linear-gradient(135deg,"+BR.p+","+BR.a+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:700,color:"white",marginBottom:12,border:"3px solid "+C.aL}}>{user.avatar}</div>
          <div style={{fontSize:17,fontWeight:700,color:C.g9}}>{user.name}</div>
          <div style={{fontSize:12,color:C.g5,marginTop:2}}>{user.email}</div>
          <div style={{marginTop:8}}><Pill label={rLb(user.role)} color={rCo(user.role)} bg={rBg(user.role)} sz={12}/></div>
          <div style={{fontSize:11,color:C.g5,marginTop:5}}>{user.company}</div>
        </div>
        <Card style={{marginBottom:14,background:"linear-gradient(135deg,#081A45,#0D2B6B)",border:"none"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:40,height:40,background:"rgba(255,255,255,0.12)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><path d="M6 20L20 6L34 20L20 34Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/><rect x="14" y="14" width="12" height="12" rx="3" fill="white" opacity="0.9"/></svg>
            </div>
            <div><div style={{color:"white",fontSize:13,fontWeight:700}}>Engine Business Group</div><div style={{color:BR.g,fontSize:10,letterSpacing:1}}>Supervisión · Gestión · Control</div></div>
          </div>
        </Card>
        <Card style={{marginBottom:14}}>
          {[["Nombre",user.name],["Correo",user.email],["Rol",rLb(user.role)],["Empresa",user.company],["Proyectos",user.role==="admin"?"Todos (Admin)":user.ap.length]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid "+C.g1}}>
              <span style={{fontSize:12,color:C.g5}}>{k}</span><span style={{fontSize:12,fontWeight:600,color:C.g7}}>{v}</span>
            </div>
          ))}
        </Card>
        <Btn label="Cerrar sesión" onClick={onLogout} col={C.er} out full icon="🚪"/>
        <div style={{height:16}}/>
      </Scrl>
      <NavBar active="me" onNav={onNav} role={user.role}/>
    </div>
  );
}

// Main App
export default function App(){
  const [splash,setSplash]=useState(true);
  const [user,setUser]=useState(null);
  const [screen,setScreen]=useState("login");
  const [projects,setProjects]=useState(PROJS0);
  const [advances,setAdvances]=useState(ADV0);
  const [users,setUsers]=useState(USERS0);
  const [assets,setAssets]=useState(ASSETS0);
  const [obra,setObra]=useState(OBRA0);
  const [adicionales,setAdicionales]=useState(ADIC0);
  const [selProj,setSelProj]=useState(null);
  const [hist,setHist]=useState([]);

  const go=s=>{setHist(h=>[...h,screen]);setScreen(s);};
  const back=()=>{const p=hist[hist.length-1]||"home";setHist(h=>h.slice(0,-1));setScreen(p);};
  const nav=id=>{
    const m={home:"home",projects:"projects",users:"users",cam:"cam",chart:"chart",me:"me"};
    setScreen(m[id]||id);
  };
  const login=u=>{const fr=users.find(x=>x.id===u.id)||u;setUser(fr);setScreen("home");};
  const logout=()=>{setUser(null);setScreen("login");setHist([]);};
  const openProj=p=>{setSelProj(p);go("proj");};
  const curUser=user?users.find(u=>u.id===user.id)||user:null;

  const updateProj=p=>{
    setProjects(prev=>prev.map(x=>x.id===p.id?p:x));
    if(selProj?.id===p.id)setSelProj(p);
  };
  const approveAdv=(id,status,newAdv)=>{
    if(newAdv){setAdvances(prev=>[...prev,newAdv]);return;}
    setAdvances(prev=>prev.map(a=>a.id===id?{...a,status}:a));
  };
  const toggleAsset=id=>setAssets(prev=>prev.map(a=>a.id===id?{...a,ok:!a.ok,fecha:a.ok?"":new Date().toISOString().split("T")[0]}:a));
  const addAsset=a=>setAssets(prev=>[...prev,a]);
  const addObra=e=>setObra(prev=>[...prev,e]);
  const editObra=(id,txt,who)=>setObra(prev=>prev.map(o=>o.id===id?{...o,nota:txt,edit:who}:o));
  const addAdic=a=>setAdicionales(prev=>[...prev,a]);
  const approveAdic=(id,st)=>setAdicionales(prev=>prev.map(a=>a.id===id?{...a,status:st}:a));

  const render=()=>{
    if(splash)return <Splash onDone={()=>setSplash(false)}/>;
    switch(screen){
      case"login":  return <Login onLogin={login} users={users}/>;
      case"home":   return <Dashboard user={curUser} projects={projects} advances={advances} assets={assets} onProject={openProj} onNav={nav}/>;
      case"projects":return <ProjList user={curUser} projects={projects} advances={advances} onProject={openProj} onNav={nav} onNew={()=>go("new-proj")}/>;
      case"new-proj":return <NewProject user={curUser} onSave={p=>{setProjects(prev=>[...prev,p]);back();}} onBack={back}/>;
      case"proj":   return selProj?(
        <ProjDetail
          user={curUser} project={selProj} advances={advances} assets={assets} obra={obra} adicionales={adicionales}
          onBack={back} onNav={nav}
          onUpdateProj={updateProj}
          onApprove={approveAdv}
          onToggleAsset={toggleAsset}
          onAddAsset={addAsset}
          onAddObra={addObra}
          onEditObra={editObra}
          onAddAdic={addAdic}
          onApproveAdic={approveAdic}
        />
      ):null;
      case"cam":    return <ProjList user={curUser} projects={projects} advances={advances} onProject={p=>{setSelProj(p);setScreen("proj");}} onNav={nav}/>;
      case"users":  return curUser?.role==="admin"?<UsersMgmt user={curUser} users={users} setUsers={setUsers} projects={projects} onNav={nav}/>:null;
      case"chart":  return <Reports user={curUser} projects={projects} advances={advances} onNav={nav}/>;
      case"me":     return <Profile user={curUser} onLogout={logout} onNav={nav}/>;
      default:      return <Dashboard user={curUser} projects={projects} advances={advances} assets={assets} onProject={openProj} onNav={nav}/>;
    }
  };

  return <Phone>{render()}</Phone>;
}
