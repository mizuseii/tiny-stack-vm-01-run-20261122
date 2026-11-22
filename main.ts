// Tiny stack VM for make.fun's tiny stack ISA v1. Faithful to the kit's reference VM
// (generator/subject/vm.mjs): same traps, order, and wrapping 32-bit arithmetic.
// One run answers all 40 instances; deterministic.
import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
import{join}from"node:path";
const E=new TextEncoder;
function R(p,g){let n=p.length,D=new Int32Array(256),s=0,C=new Int32Array(64),c=0,M=new Int32Array(256),o=new Uint8Array(65536),l=0,i=0,k=0,t=0;
const T=e=>({o:o.slice(0,l),code:e});
for(;;){
if(t==1e6)return T(10);
if(k<0||k>=n)return T(9);
let u=p[k];
if(!(u<8||u>15&&u<35&&u!=31||u>47&&u<53||u>63&&u<66||u>79&&u<84))return T(5);
let m=u==1?1:u==2?4:u>47&&u<52?2:0;
if(k+m>=n)return T(9);
t++;let x=k+1+m;k=x;
if(u>15&&u<35&&u!=23&&u!=27){
if(s<2)return T(2);
let b=D[s-1],a=D[s-2];
if(u>18&&u<23&&!b)return T(4);
let r=u==16?(a+b)|0:u==17?(a-b)|0:u==18?Math.imul(a,b):u==19?a==-2147483648&&b==-1?a:(a/b)|0:u==20?b==-1?0:a%b|0:u==21?Math.floor((a>>>0)/(b>>>0))|0:u==22?(a>>>0)%(b>>>0)|0:u==24?a&b:u==25?a|b:u==26?a^b:u==28?a<<(b&31):u==29?a>>(b&31):u==30?a>>>(b&31)|0:u==32?a==b?1:0:u==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
D[s-2]=r;s--;continue}
switch(u){
case 0:return T(0);
case 1:if(s>255)return T(3);D[s++]=(p[x-1]<<24)>>24;break;
case 2:if(s>255)return T(3);D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:if(s<1)return T(2);s--;break;
case 4:if(s<1)return T(2);if(s>255)return T(3);D[s]=D[s-1];s++;break;
case 5:if(s<2)return T(2);let w=D[s-1];D[s-1]=D[s-2];D[s-2]=w;break;
case 6:if(s<2)return T(2);if(s>255)return T(3);D[s]=D[s-2];s++;break;
case 7:if(s<3)return T(2);let z=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=z;break;
case 23:if(s<1)return T(2);D[s-1]=-D[s-1]|0;break;
case 27:if(s<1)return T(2);D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{let y=((p[x-2]|p[x-1]<<8)<<16)>>16,v=1;if(u>48){if(s<1)return T(2);v=D[--s];if(u==49)v=!v;else v=!!v}if(u==48||v)k=x+y;break}
case 51:if(c==64)return T(7);C[c++]=x;k=p[x-2]|p[x-1]<<8;break;
case 52:if(!c)return T(8);k=C[--c];break;
case 64:if(s<1)return T(2);let A=D[s-1];if(A<0||A>255)return T(6);D[s-1]=M[A];break;
case 65:if(s<2)return T(2);let B=D[s-1],V=D[s-2];if(B<0||B>255)return T(6);s-=2;M[B]=V;break;
case 80:if(s<1)return T(2);let Y=E.encode(String(D[s-1]));if(l+Y.length>65536)return T(11);s--;o.set(Y,l);l+=Y.length;break;
case 81:if(s<1)return T(2);if(l+1>65536)return T(11);o[l++]=D[--s]&255;break;
case 82:if(s>255)return T(3);D[s++]=i<g.length?g[i++]:-1;break;
default:if(s<1)return T(2);return T(D[--s]&255);
}}}
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const d of readdirSync(I).sort()){
let r=R(new Uint8Array(readFileSync(join(I,d,"program.bin"))),new Uint8Array(readFileSync(join(I,d,"input.bin"))));
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,"stdout.bin"),r.o);
writeFileSync(join(O,d,"exit.txt"),r.code+"\n")}
