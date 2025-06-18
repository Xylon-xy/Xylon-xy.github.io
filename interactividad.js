// interactividad.js

// 1) Reloj en tiempo real
function actualizarReloj() {
  var now = new Date();
  var h = String(now.getHours()).padStart(2,'0');
  var m = String(now.getMinutes()).padStart(2,'0');
  var s = String(now.getSeconds()).padStart(2,'0');
  document.getElementById('reloj').textContent = h+':'+m+':'+s;
}
setInterval(actualizarReloj,1000);
actualizarReloj();

// 2) Datos de consolas
var consolas = [
  {nombre:'Atari Pong',año:1972,desc:'Primer éxito comercial de Atari.'},
  {nombre:'NES',año:1983,desc:'Revolucionó las consolas domésticas.'},
  {nombre:'Game Boy',año:1989,desc:'Portátiles líder de ventas.'},
  {nombre:'PlayStation',año:1994,desc:'Sony entra al mercado 3D.'},
  {nombre:'Xbox',año:2001,desc:'Microsoft debuta en consolas.'},
  {nombre:'Switch',año:2017,desc:'HíbridaPortátil/TV.'},
  {nombre:'PS5',año:2020,desc:'Nueva generación de gráficos.'}
];

// 3) Línea de tiempo filtrable + modal
function actualizarLinea() {
  var filtro = document.getElementById('filtroDecada').value;
  var cont = document.getElementById('timeline');
  cont.innerHTML = '';
  for (var i=0;i<consolas.length;i++) {
    var c=consolas[i];
    var dec = Math.floor(c.año/10)*10;
    if (filtro==='todas' || String(dec)===filtro) {
      var div=document.createElement('div');
      div.className='event';
      div.innerHTML = '<h3>'+c.año+' – '+c.nombre+'</h3>';
      div.onclick = (function(item){
        return function(){ abrirModal(item); };
      })(c);
      cont.appendChild(div);
    }
  }
}
function abrirModal(item) {
  document.getElementById('modalTitulo').textContent = item.nombre;
  document.getElementById('modalTexto').textContent = item.desc;
  document.getElementById('modal').style.display = 'flex';
}
function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}
window.onload = actualizarLinea;

// 4) Quiz con if…else
function verificarQuiz() {
  var opts=document.getElementsByName('q1'),sel,out=document.getElementById('resQuiz');
  for(var i=0;i<opts.length;i++) if(opts[i].checked) sel=opts[i].value;
  if(!sel) { out.textContent='Selecciona una opción.'; out.className='mensaje error'; }
  else if(sel==='1983') { out.textContent='✔️ Correcto'; out.className='mensaje success'; }
  else { out.textContent='❌ Incorrecto'; out.className='mensaje error'; }
}

// 5) Texto con cadenas
function procesarTexto() {
  var t=document.getElementById('txtJuego').value.trim(),out=document.getElementById('salidaTexto');
  if(!t) { out.textContent='Escribe un nombre.'; out.className='mensaje error'; return; }
  var msg='Mayúsculas: '+t.toUpperCase()+' | Largo: '+t.length;
  msg+=' | Inicial: '+t.charAt(0)+' | Invertido: '+t.split('').reverse().join('');
  out.innerHTML=msg; out.className='mensaje success';
}

// 6) Cálculos numéricos
function realizarCalculos() {
  var a=parseFloat(document.getElementById('num1').value),
      b=parseFloat(document.getElementById('num2').value),
      out=document.getElementById('salidaCalc');
  if(isNaN(a)||isNaN(b)) { out.textContent='Valores no válidos'; out.className='mensaje error'; return; }
  out.innerHTML='Total horas: '+(a*b)+'<br>Suma: '+(a+b);
  out.className='mensaje success';
}

// 7) Filtro en vivo
function filtrarConsolas() {
  var q=document.getElementById('busca').value.toLowerCase(),ul=document.getElementById('listaConsolas');
  ul.innerHTML='';
  for(var i=0;i<consolas.length;i++){
    var c=consolas[i];
    if(c.nombre.toLowerCase().includes(q)){
      var li=document.createElement('li');
      li.textContent=c.nombre+' ('+c.año+')';
      ul.appendChild(li);
    }
  }
}

// 8) Valoración con estrellas
(function(){
  var starsCont=document.getElementById('stars'),
      msg=document.getElementById('ratingMsg'),
      select=document.getElementById('ratingConsole');
  for(var i=1;i<=5;i++){
    var span=document.createElement('span');
    span.className='star'; span.innerHTML='★'; span.dataset.val=i;
    span.onclick=function(){
      var v=this.dataset.val,c=select.value;
      if(!c){ msg.textContent='⚠️ Selecciona consola primero.'; msg.className='mensaje error'; return; }
      var arr=starsCont.children;
      for(var j=0;j<arr.length;j++){ arr[j].classList.toggle('filled', j< v); }
      msg.textContent='Has valorado '+c+' con '+v+'⭐'; msg.className='mensaje success';
    };
    starsCont.appendChild(span);
  }
})();
