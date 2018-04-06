/* xxXXXxxxXXXxxx */

document.oncontextmenu = function () {
  return false;
};

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}, false);

/* count images loaded on loading screen */

var imglist = document.getElementsByTagName("img");
var imgcount;
var numb = parent.document.getElementById("numb");
var imglistlength = imglist.length;
var start = 0;
for (imgcount = 0; imgcount < imglist.length; imgcount++) {
      if( imglist[imgcount].complete ) {
        start += 1;
        numb.textContent = Math.round((start / imglistlength) * 100) + "%";
      }
      else {
        imglist[imgcount].onload = function() {
            start += 1;
            numb.textContent = Math.round((start / imglistlength) * 100) + "%";

        };
      }
}

window.onload = function() {

/* fade out loading screen, check for birthday localstorage */

      var birthdayproceed = document.getElementById("birthdayproceed");
      var bdayentry = document.getElementById("bday");
      var bmonthentry = document.getElementById("bmonth");
      var playerbirthday, playerbirthmonth;

      if (localStorage.getItem("playerbirthday") === null || localStorage.getItem("playerbirthday") === undefined) {
        /* they don't have a birthday */
        $('#loadeng, #numb, #percent').delay(1200).fadeOut(500, function(){
          $('#birthdayscreen').delay(300).fadeIn(500);
        });
      }
      else { /* they have a birthday */
        playerbirthday = localStorage.getItem("playerbirthday");
        playerbirthmonth = localStorage.getItem("playerbirthmonth");
        $('#loadtext').delay(1200).fadeOut(500, function(){
          $('#loading').delay(1000).fadeOut(500, function(){
            $('#screennote').delay(600).fadeIn(500);
          });
        });

      }

/* close the birthday div once they've entered it, localstorage the values */

      birthdayproceed.onclick = function() {
        playerbirthday = bdayentry.value;
        playerbirthmonth = bmonthentry.value;
        /* in case player is using private browsing */
        try { localStorage.setItem("playerbirthday", playerbirthday);
              localStorage.setItem("playerbirthmonth", playerbirthmonth);
        } catch (e) { /* didn't work */ }
        $('#birthdayscreen').delay(100).fadeOut(500, function(){
          $('#thankyounote').delay(600).fadeIn(500, function(){
            $('#loadtext').delay(1200).fadeOut(500, function(){
              $('#loading').delay(1000).fadeOut(500, function(){
                $('#screennote').delay(600).fadeIn(500);
              });
            });
          });
        });
      };

/* make user click the block div to play a sound once & get apple off my case */

      var allowsound = document.getElementById("allowsoundempty");
      allowsound.addEventListener("click", playon, false);
      var soundfile = document.getElementById("soundfile");
      soundfile.setAttribute("src", "2/app/allowsound.mp3");

      var loadingsc = document.getElementById("loading");
      var resizetxt = document.getElementById("resizetext");

      function playon(e) {

            soundfile.play();
            document.getElementById("waitforvoice").style.display = "block";
            $('#screennote').delay(100).fadeOut(400);
            $('#allowsound').delay(700).fadeOut(500, function(){
              $("#navbar").animate({ bottom: "0px"}, 200, function(){
                $("#clouds").animate({ top: "-50px"}, 200, function(){
                  $("#favimg").animate({ left: "-20%"}, 200);
                });
              });
/*  if their screen is wide, show them blackbox until they make it tall  */
              if (window.innerWidth > window.innerHeight) {
                soundfile.muted = true;
                loadingsc.style.display = "block";
                resizetxt.style.display = "block";
              }
            });

/* make the resize function fire every time window is resized */

            window.addEventListener("resize", windowresized);
            window.addEventListener("orientationchange", windowresized);
            var ggg = document.getElementById("lll").innerHTML;

            function windowresized() {
              if (window.innerWidth / window.innerHeight < 1) {
                loadingsc.style.display = "none";
                soundfile.muted = false;
              }
              else {
                loadingsc.style.display = "block";
                resizetxt.style.display = "block";
               }
            }

            /* sakuya */

            var sakuyatime = ["ふぁ～。…はっ！お、おはようございます！", "お昼だ～！　たくさん食べて、午後の稽古に備えましょう！", "みんながいるから、夜も寂しくないですね", "明日も良い一日になりますように…おやすみなさい！"];

            var sakuyaother = ["うわっ！び、びくうりしたぁ・・・", "早く舞台に立ちたいなぁ・・・", "はい！なんですか？", "こ、これも演技の練習ですか・・・？", "オレも、カントクのこと・・・触ってもいいですか？", "Show must go on!　です！", "カントク！稽古お願いします！", "あははっ、ちょっとくすぐったいです", "オレ、もっともっと頑張ります！"];

            var sakuyatimesound = ["sakuya/morning", "sakuya/noon", "sakuya/eve", "sakuya/night"];
            var sakuyaothersound = ["sakuya/uwa", "sakuya/hayaku", "sakuya/hainan", "sakuya/koremo", "sakuya/oremokantoku", "sakuya/showmust", "sakuya/kantokukeiko", "sakuya/hahachoto", "sakuya/oremoto"];

            /* masumi */

            var masumitime = ["おはよ・・・監督、今日もかわいい・・・", "手作り弁当？アンタの作ったものならなんでも食べる", "…今日は一回も褒めてもらえてないんだけど", "アンタと寝たい。・・・ダメ？"];

            var masumiother = ["アンタは俺のものじゃないかもしれないけど俺はアンタのものだか・・・覚えてて", "そこじゃない、もっと右。そう、そこ・・・気持ちい", "はぁ・・・好き", "アンタになら、触られてもいい", "このほくろ、気になる？", "なに？", "ねえ、もっと構って", "アンタがそばにいてくれると、安心する・・・", "命令して、俺に"];

            var masumitimesound = ["masumi/morning", "masumi/noon", "masumi/eve", "masumi/night"];
            var masumiothersound = ["masumi/antawa", "masumi/soko", "masumi/suki", "masumi/antaninara", "masumi/kono", "masumi/nani", "masumi/motokama", "masumi/antaga", "masumi/merei"];

            /* tsuzuru */

            var tsuzurutime = ["よし、今日も一日頑張りましょう！", "うわ、もうお昼か。時間が経つのが早ぇ…", "俺、疲れた顔してますか？でも、監督の顔みたら元気出たっすよ", "あれ、まだ起きてんすか？睡眠は大事っすよ。人のこと言えねーけど"];

            var tsuzuruother = ["ほら、遊んでないで稽古やりましょーよ！", "まったく、咲也も真澄も世話が焼ける…", "ははっ、うちの弟みたいっすね", "引っ越し屋のバイトやっててよかったなー", "ん？どうしたんですか？", "次の脚本のネタ、どーすっかな…", "そんなにつっついたって楽しくないでしょうよ…", "やれやれだわ…まじで", "っ、ちょっと、どこ触ってるんすか…やり返しますよ？"];

            var tsuzurutimesound = ["tsuzuru/morning", "tsuzuru/noon", "tsuzuru/eve", "tsuzuru/night"];
            var tsuzuruothersound = ["tsuzuru/hora", "tsuzuru/mataku", "tsuzuru/hehe", "tsuzuru/hikoshi", "tsuzuru/dou", "tsuzuru/tsugi", "tsuzuru/sonnani", "tsuzuru/yare", "tsuzuru/choto"];

            /* itaru */

            var itarutime = ["朝の支度って、なんでこんなに面倒なんだろうね", "干物オタク…？　なんのことかな？", "監督さん、今日も一日お疲れ様。じゃ、俺は部屋にこもるから", "もう寝た方がいいんじゃない？…俺？　俺は今日も楽しい夜更しだよ"];

            var itaruother = ["あー、ミスった。マジふざけんなよ", "おいで。仕方ないから構ってあげるよ", "全自動俺を風呂に入れてくれる機が欲しい…", "ん？ どうしたの？", "監督さんの前だと色々ゆるむな～。はは、色々は色々だよ", "はー…不労所得で生活したい… 働かずにゲームしてたい", "くそ、殺すぞ雑魚", "マジか、キタコレ", "ははっ、なんでも頼ってね"];

            var itarutimesound = ["itaru/morning", "itaru/noon", "itaru/eve", "itaru/night"];
            var itaruothersound = ["itaru/miss", "itaru/oide", "itaru/zen", "itaru/dou", "itaru/kanto", "itaru/sigh", "itaru/kuso", "itaru/maji", "itaru/hehe"];

            /* citron */

            var citrontime = ["モーニンダヨ！早起きは三門のトクさんね", "今日も平和のため、我が国のダンスを披露するネ", "日本の夜は快適でオアシスネ～", "夜更しは我が国の法律に反するヨ"];

            var citronother = ["オー？、どしたネ", "愛のムチ打ち、気持ちいいネー", "日本語、やっぱり難しいヨ", "ノープロテイン。心配いらないネ", "レデイファースト、我が国のたしなみヨ", "ウーン、ツヅルのツッコミには負けるネ", "日本のカルチャーは宝ヨ～", "広辞苑で二ホン語勉強タイムヨ", "カントク、アナタに我が国の海見せたい...一緒に来てくれるネ？"];

            var citrontimesound = ["citron/morning", "citron/noon", "citron/eve", "citron/night"];
            var citronothersound = ["citron/oodo", "citron/aino", "citron/nihongoya", "citron/noprotein", "citron/ready", "citron/tsuzu", "citron/nihonno", "citron/koji", "citron/kantoku"];

            /* tenma */

            var tenmatime = ["おはよ。監督も早く支度しろよ。じゃ、いってきます", "今日もファンに囲まれて大変だった。ふぅ…人気者も楽じゃないな", "オレ主演のドラマ、もうすぐ放送始まるみたいだぞ", "眠れなくなることくらい、オレにだってある"];

            var tenmaother = ["そんなに構って欲しいなら、キスシーンの相手でもしてくれよ", "オレだってヒマじゃないんだぞ", "幸の野郎、部屋でガミガミうるさいんだよ…", "おっと…驚かせんなよ", "学校なんてつまんねーよ　オレは芝居してる時が一番楽しい", "いつか　『月刊盆栽の友』　の表紙に…！", "オレは方向音痴じゃない！…ちょっと道を覚えるのが苦手なだけだ", "ん？何か用かよ", "やっとオレのすごさが分かったか？"];

            var tenmatimesound = ["tenma/morning", "tenma/noon", "tenma/eve", "tenma/night"];
            var tenmaothersound = ["tenma/sona", "tenma/orehima", "tenma/yukino", "tenma/odoro", "tenma/gako", "tenma/itsuka", "tenma/orewa", "tenma/nanka", "tenma/yato"];

            /* yuki */

            var yukitime = ["おはよ。着る服迷ってんの？仕方ないから選んであげる", "可愛いショップ見つけたんだけど、監督も来る？", "オレはもう寝るよ。寝る子は育つって言うでしょ", "天馬の寝言がうるさくて起こされた…最悪"];

            var yukiother = ["今度の衣装、自信作だから楽しみにしてて", "ベタベタ触るな変態", "何つまらそうな顔してんのさ。はぁ…仕方ないから構ってあげる", "天馬はすぐ部屋を散らかすんだよね…本当ポンコツ", "ちょっと…うざいんだけど", "この服が可愛いって？ふん、オレが着てるんだから当たり前じゃん", "はぁ…何？", "カレー星人はカレーでもたべてなよ", "次の衣装はどんなにしようかな…あれとあれを組み合わせてビジューをつけて…"];

            var yukitimesound = ["yuki/morning", "yuki/noon", "yuki/eve", "yuki/night"];
            var yukiothersound = ["yuki/kondo", "yuki/beta", "yuki/nanitsu", "yuki/tenma", "yuki/choto", "yuki/kono", "yuki/nani", "yuki/kare", "yuki/tsugi"];

            /* muku */

            var mukutime = ["おはようございます！今日も良い日になりますように！", "ボクにお手伝いできることがあったら言ってくださいね", "今日は宿題いっぱい出されちゃいました…", "う～ん…姫様、ボクがお助けいたします…"];

            var mukuother = ["わっ！な何でしょう！？", "フローラ姫、ボクと愛を誓…うわああ！　見られちゃった…恥ずかしい…", "カントクさんも漫画読みますか？おススメはこれとこれと……", "あと１０センチくらい身長伸びないかなぁ…", "はっ！　今日は新刊の発売日…！", "カントクさんもチョコレートどうぞ", "グスっ…やっぱり当て馬はしょせん当て馬なんですね…", "ボクも王子様みたいになれるかな…", "いつかボクも、カントクさんに相応しい男の子になってみせます…！"];

            var mukutimesound = ["muku/morning", "muku/noon", "muku/eve", "muku/night"];
            var mukuothersound = ["muku/nan", "muku/furo", "muku/kantokumanga", "muku/ato", "muku/kyo", "muku/kantokuchoco", "muku/gusu", "muku/bokumo", "muku/itsuka"];

            /* misumi */

            var misumitime = ["朝ごはんはおにぎりが一番！はい、どーぞ", "今日は良いさんかくが見つかる予感…！", "１日お疲れ様でした！　えらい、えらい", "昨日のさんかくの夢の続きが見られますように…"];

            var misumiother = ["さんかくって書いて三角（みすみ）って読むんだよ", "はっ、そのさんかくは…！", "カントクさんも、さんかく探しする？", "このおにぎり…さんかくじゃない…！", "じーちゃんもオレのお芝居見てくれてるかなぁ", "美味しいおにぎりの作り方、今度教えてあげる！", "聞いてください、さんかくの歌。さんかく～さんかく～♪", "早くみんなとお芝居したいな～…", "さんかくあげるから、カントクさんぎゅってしても良い？"];

            var misumitimesound = ["misumi/morning", "misumi/noon", "misumi/eve", "misumi/night"];
            var misumiothersound = ["misumi/sankakute", "misumi/sono", "misumi/kantokomo", "misumi/kono", "misumi/jichan", "misumi/oishi", "misumi/kite", "misumi/hayaku", "misumi/sankakuage"];

            /* kazu */

            var kazutime = ["おはピコ☆　今日のオレも絶好調♪", "ふわぁ…やばねむ～こっそり２人でお昼寝しない？", "今日は３００ええな！か～明日は目指せ５００ええな！", "もしかしてオレからのおやすみのチューをご所望！？　仕方ないな～"];

            var kazuother = ["なになに～？", "オレに惚れちゃったりなんかして！？", "にゃははっ！くすぐったいって～", "やる気の出ないこんな日は…自主休講に限る♪", "さーて、亀吉と遊んでこよ～♪", "カントクちゃん今日もよろピコ☆", "今日も可愛いーね♪", "ピコって響き可愛くない？", "オレとしては、そろそろ男としても見てもらいたいんだけど？　…なーんてね"];

            var kazutimesound = ["kazu/morning", "kazu/noon", "kazu/eve", "kazu/night"];
            var kazuothersound = ["kazu/nani", "kazu/oreni", "kazu/nya", "kazu/yaruki", "kazu/saa", "kazu/kanto", "kazu/kyo", "kazu/pico", "kazu/oreto"];

            /* banri */

            var banritime = ["ふぁあ…マジねみい…学校？行きたくねーけど、サボるとアンタに怒られっからな…", "休み時間は寝るに限るよなー。んじゃ、おやすみ～", "ん？　こんなとこでどーしたよ？だいぶお疲れみてぇだな", "おいおい、夜更かしは美容の天敵だろそれとも、寝られねぇんなら一緒に寝る？"];

            var banriother = ["ハイハイ、楽勝楽勝", "俺の人生スーパーウルトライージーモードよゆ～じゃね？", "兵頭てめぇ…今日こそ落とし前つけてやる", "だ～から、喧嘩じゃねーって", "おいおいなんだよ。かまってほしーの？素直に言ってみ？", "このピアス、いいっしょ。結構気に入ってんだよな", "NEO？　ああ、俺のハンネのことだろ", "へーへー、稽古ね。もーちょいしたら行くって", "監督ちゃんの言葉、時々無性に刺さるんだよな。俺にとって特別な存在だから…かも？"];

            var banritimesound = ["banri/morning", "banri/noon", "banri/eve", "banri/night"];
            var banriothersound = ["banri/hai2", "banri/oreno", "banri/hyodo", "banri/dakara", "banri/oi2", "banri/kono", "banri/neo", "banri/hei2", "banri/kanto"];

            /* juza */

            var juzatime = ["アンタ、朝からよく働くな。俺に手伝えることがあったら言ってくれ", "亀吉まんじゅう？また仕入れたのか？…べ、別に、興味ねぇよ", "ああ、これか。臣さんにもらった。今日の差し入れはスコーンらしい", "まだ起きてんのか？明日も早ぇんだろ。さっさと切り上げて寝ることだな"];

            var juzaother = ["なんだ。どうした？", "悪ぃな。この目つきは生まれつきだ", "俺がお前に負けるわけねぇだろ…。なぁ、摂津", "十ちゃんだと…？その呼び方はやめろ", "お前、俺が怖くねぇのか？", "売られた喧嘩は買うだけだ", "おい…触りすぎだ。ガキ扱いすんなよ", "テンプレヤンキー？なんのことだ", "なんつーか、監督は…今まで会ってきたオンナとは全然違う…俺にとって、特別だ"];

            var juzatimesound = ["juza/morning", "juza/noon", "juza/eve", "juza/night"];
            var juzaothersound = ["juza/nan", "juza/war", "juza/orega", "juza/juu", "juza/oma", "juza/ura", "juza/oi", "juza/ten", "juza/nantsu"];

            /* taichi */

            var taichitime = ["朝からうるさいって？へへっ、俺っちにとっては褒め言葉ッスよ！", "ロッカーにラブレター！？って果たし状じゃないッスかー！天チャンの仕業ッスね！？", "今日、学校で告白現場に遭遇したッス…うぅ…俺っちもモテてぇ～！", "ふぁ…っと！まだまだ！監督先生が寝るまで、俺っちも寝ないッスよ…"];

            var taichiother = ["モテてぇ～！今すぐ即座にモテてぇ～！", "俺っちって、そんなに犬っぽいッスか？", "さ、３回まわって…ワン？　って、何やらせるんスか！", "ちょ、ちょ！　そこは弱いからぁ～！もー！　いくら監督先生でもダメッスよ！", "万チャンも十座サンもすげーッス！それに比べて俺…自分で言ってて凹んできたッス…", "この髪、かっこいいっしょ！赤髪は俺っちの…えっとー、あいでんてぃてぃ…？ッス！", "げっ…やべぇ、左京にぃにまた怒られるッス…臣クンに相談しよう", "ヨーヨーなら負けないッスよ！", "もー、触っちゃダメって言ってるのに…俺、勘違いしちゃうッスけど。いいッスか？"];

            var taichitimesound = ["taichi/morning", "taichi/noon", "taichi/eve", "taichi/night"];
            var taichiothersound = ["taichi/mote", "taichi/orechi", "taichi/sankai", "taichi/choyowai", "taichi/banchan", "taichi/kono", "taichi/yabei", "taichi/yoyo", "taichi/mou"];

            /* omi */

            var omitime = ["おはよう。って、おいおい…早く起きないと遅刻するぞ？", "今日の食事当番は俺だよな。リクエスト、あるなら聞くから言ってくれ", "お疲れ。さっき十座にも渡したんだが、差し入れはスコーンでいいか？", "子守歌？あー、俺、歌はあんまり得意じゃないんだ。添い寝くらいなら付き合うが…"];

            var omiother = ["ああ、この傷か？　…あまり気にしないでくれ", "おーらおらおら、ケンカは終わりだ", "シャイニング・ウィザード？あぁ、そういえば…親父の得意技だ", "っと…こらこら、あんまり脅かすなよ", "『狂狼（きょうろう）』？うーん…その名前はあんまり覚えてないな", "みんな～キッシュが焼けたぞ～", "昔は親父と弟たちと家でプロレス技の掛け合いしてたな。このガタイはそのせいか？", "最近は芝居がメインだけど、久しぶりにカメラマンとしての仕事もしたいな", "大事にしたいのに、俺なんかの傍にいたら…って考えちまう。昔のクセが抜けないな"];

            var omitimesound = ["omi/morning", "omi/noon", "omi/eve", "omi/night"];
            var omiothersound = ["omi/kono", "omi/hora", "omi/shin", "omi/kora", "omi/kyoro", "omi/mina", "omi/muka", "omi/sai", "omi/dai"];

            /* sakyo */

            var sakyotime = ["だらだらすんな、しゃきっとしろ。あと５分以内に起きなければ殺す", "迫田の野郎…毎日毎日よく飽きずにここまで来るもんだ", "随分お疲れだな。仕方ねぇ、労ってやるよ…今日も一日頑張ったな", "お前、疲れてるんじゃなかったのか？ったく…それで？俺にどうしてほしいんだ？"];

            var sakyoother = ["次はどうするんだ？監督さん", "『質素・倹約・節制』だ！…復唱してみろ", "おいてめぇ…誰にメンチ切ってんだ？", "泣きボクロか。別に触っても楽しくねぇだろ", "この眼鏡に一瞬でも触れて指紋をつけてみろ瞬時に殺す", "やる気のねぇやつは帰れ。俺は芝居をしにきたんだ", "人をヤクザヤクザって…ガタガタうるせぇな", "お前のそれは無意識か？いや…だとしても余計にタチが悪ぃな", "黙って大人しくしてれば好き勝手しやがって…覚悟はできてんだろうな？"];

            var sakyotimesound = ["sakyo/morning", "sakyo/noon", "sakyo/eve", "sakyo/night"];
            var sakyoothersound = ["sakyo/tsugi", "sakyo/shi", "sakyo/oi", "sakyo/gaki", "sakyo/kono", "sakyo/yaru", "sakyo/hito", "sakyo/oma", "sakyo/dama"];

            /* tsumugi */

            var tsumugitime = ["おはよう…ございます…すみません、俺、朝…弱くて…", "大きくなーれ、綺麗になーれ…わっ！すみません、水やりに夢中で…", "夜風が気持ちいいですね。今夜は中庭で台本を読もうかな", "もう遅いですよ？無理しないで、また明日頑張りましょう"];

            var tsumugiother = ["ん？俺に用事ですか？", "俺で良ければ相談にのりますよ", "わっ！　…あ、ちょっとビックリしただけです", "仏の顔も三度まで……なんて、冗談ですよ", "実は、中庭の花にはみんな名前をつけてるんですよ。どんな名前かは…内緒です", "何事も水やり三年ですよ", "お庭番長の名にかけて、お庭の平和は俺が守ります", "はぁ…また丞に怒られた…", "あの…俺、そこ結構弱くて…で、でもカントクの為ならもうちょっと我慢します"];

            var tsumugitimesound = ["tsumugi/morning", "tsumugi/noon", "tsumugi/eve", "tsumugi/night"];
            var tsumugiothersound = ["tsumugi/oreni", "tsumugi/orede", "tsumugi/wa", "tsumugi/kao", "tsumugi/jitsu", "tsumugi/nani", "tsumugi/oniwa", "tsumugi/mata", "tsumugi/ano"];

            /* tasuku */

            var tasukutime = ["朝イチのランニング、監督も行くか？", "監督業も大変だな。まあ…無理すんなよ", "晩飯は町内一周走ってから？分かった、行ってくる", "眠れないのか？体動かせばよく眠れるぞ"];

            var tasukuother = ["おい、触るな", "構ってほしけりゃ他所をあたれ", "はぁ…監督もしつこいな", "劇団員とのコミュニケーションも仕事？…なら仕方ないな", "俺はさほどでもないけど、紬は結構くすぐったがりだぞ", "たーちゃんって呼ぶな", "…早く舞台の上で芝居がしたい", "GOD座にいた時の俺は忘れてくれ…", "その…アンタは俺にとって大事な監督なんだ…たまには頼れよ"];

            var tasukutimesound = ["tasuku/morning", "tasuku/noon", "tasuku/eve", "tasuku/night"];
            var tasukuothersound = ["tasuku/sawa", "tasuku/kama", "tasuku/kanto", "tasuku/gekidan", "tasuku/orewa", "tasuku/ta", "tasuku/haya", "tasuku/god", "tasuku/sono"];

            /* hisoka */

            var hisokatime = ["おはよう……おやすみ……ぐー…", "ふああ～。今日は良い天気だから公園で寝よう", "夕飯はマシュマロが良いって臣に言っておいて", "月が、大きい…。なんでオレはこんなに悲しいんだろう…"];

            var hisokaother = ["ぐー…すぴー…", "ううん…マシュマロとるな…", "んー…よく寝た……けどもうちょっと寝る", "起こされた…最悪。オレに何かよう？", "何でそんなに寝るのか？眠いから。それ以外ないでしょ", "昨日夢を見たんだけど……あれ？何の夢だっけ？", "何驚いてるの？オレだって起きてる時くらいあるよ", "昨日もアリスがうるさくて眠れなかった…", "いい枕発見。今日からカントクの膝はオレ専用ね"];

            var hisokatimesound = ["hisoka/morning", "hisoka/noon", "hisoka/eve", "hisoka/night"];
            var hisokaothersound = ["hisoka/guu", "hisoka/toruna", "hisoka/yoku", "hisoka/oko", "hisoka/nande", "hisoka/kino", "hisoka/nani", "hisoka/mo", "hisoka/ii"];

            /* homare */

            var homaretime = ["おはよう。はははっ、いつにもましておバカさんな顔だね", "君は幸運だね、今さっきこの世に生まれたばかりの名作を一番に聞けるのだから", "……はっ！月の美しさに魅入られてしまった…", "眠れないのかい？仕方ないね、ワタシが本を読んであげよう"];

            var homareother = ["ワタシの芸術に感動したって？", "監督くん、キミはシェイクスピアをどう思う？", "ん？なんだいワタシに構って欲しいのかい？", "ワタシに触れたキミのその指…10年後には1億円の価値が出るよ", "やれやれ…みんなおバカさんで困るよ。だがそれも愛しさだね", "あ゛～～芸術が…降りてこない…", "神は我々を人間にするために欠点を与えるらしい。ふむ…今月の課題にしよう", "さ～て、密くんで遊ぼうかな♪", "キミ、もしやワタシの事が…！ゴホン。いや、今はまだ言わないでおこう"];

            var homaretimesound = ["homare/morning", "homare/noon", "homare/eve", "homare/night"];
            var homareothersound = ["homare/watashi", "homare/kantoku", "homare/nandai", "homare/watashini", "homare/yare", "homare/aaa", "homare/kare", "homare/saa", "homare/kimi"];

            /* azuma */

            var azumatime = ["たまには早起きも悪くないね。可愛い寝起き姿も見られるし", "暇なら一緒に塗り絵でも。それとも…もっとイイコトする？", "暗くなってきたね…。オオカミさんには気を付けるんだよ", "眠れない？可哀想に。それならボクの部屋へおいで"];

            var azumaother = ["ふふっ、なーに？", "こらこら、お触りは禁止だよ", "くすぐったいなぁ。もしかしてボクで遊んでる？", "ボク、遊ばれるより遊ぶ方が好きなんだけど？", "寂しい夜はボクを呼んでね", "ん？色っぽい？ふふっ、ありがとう", "虫だけは勘弁して。本当に苦手だから…", "いつまでも美しくいたいよね。醜いのは嫌", "カントクはどこを触ってほしい？ほら、恥ずかしがらないで教えてよ"];

            var azumatimesound = ["azuma/morning", "azuma/noon", "azuma/eve", "azuma/night"];
            var azumaothersound = ["azuma/fufunani", "azuma/korakora", "azuma/kusugu", "azuma/bokuaso", "azuma/sabishi", "azuma/iro", "azuma/mushi", "azuma/itsumade", "azuma/kantokuwa"];

            /* chikage */

            var chikagetime = ["おはよう。今日も一日頑張っておいで。いってらしゃい、監督さん", "今日の昼飯は...インドメキシコ、タイ料理...んーどれにするかなー", "へー？夜更かしか...俺で良ければ相手してやろか？何をしたいか、言ってごらん", "安心して眠るといい。おやすみ、また明日"];

            var chikageother = ["そろそろ止めてくれないかな", "ちかウサ？カレーブログ？なんのことかな", "監督さんを見てると、おせっかいで馬鹿みたいにお人よしだったアイツを思い出すよ", "俺を知りたい...？君も命知らずだな。じゃあ、俺の目をよーく見て。ほら、もっと近くで", "...監督さんも、いい度胸してる", "今日のスパイスは自信作だ。味見してみる？ほら、遠慮しないで", "俺はどこにでもいる平凡な商社マンだよ", "真実は弱さだ。周りの人間が全員味方とは限らない", "この眼鏡は伊達かって？...それは秘密"];

            var chikagetimesound = ["chikage/morning", "chikage/noon", "chikage/eve", "chikage/night"];
            var chikageothersound = ["chikage/soro", "chikage/chi", "chikage/kanmi", "chikage/orewo", "chikage/kantokusa", "chikage/kyo", "chikage/orewa", "chikage/shinjitsu", "chikage/kono"];


            /* matsukawa */

            var matsukawatime = ["おはようございます。おや、お米が足りない？亀吉のご飯で良ければどうぞ", "お洗濯も終わりましたし、お煎餅を食べながら昼ドラでもみましょうかね", "久しぶりに私が夕食を作りましょうかね。リクエスト聞きますよ", "ぷぷっ、亀吉が古市さんのモノマネを…っ！もう可笑しすぎてっ眠れない…っ！"];

            var matsukawaother = ["監督も亀吉とおしゃべりしたいんですか？", "あのおしゃべりオウム、私のことを止まり木としか思っていないんですよ", "MANKAIカンパニーには七不思議があるんです。機会があればお話ししましょう", "私の部屋がどこにあるのか気になる…？まさか監督、夜這いする気じゃ…！", "監督も亀吉とおしゃべりしたいんですか？", "あのおしゃべりオウム、私のことを止まり木としか思っていないんですよ", "MANKAIカンパニーには七不思議があるんです。機会があればお話ししましょう", "私の部屋がどこにあるのか気になる…？まさか監督、夜這いする気じゃ…！", "監督も亀吉とおしゃべりしたいんですか？"];

            var matsukawatimesound = ["matsukawa/morning", "matsukawa/noon", "matsukawa/eve", "matsukawa/night"];
            var matsukawaothersound = ["matsukawa/0", "matsukawa/1", "matsukawa/2", "matsukawa/3", "matsukawa/0", "matsukawa/1", "matsukawa/2", "matsukawa/3", "matsukawa/0"];

            /* sakoda */

            var sakodatime = ["今朝もアニキに清々しい朝をお届けっす！", "アニキ忙しそうだし、イチパチでも行くか…", "夕飯だー！エビフライがおれを呼んでいるー！", "見回りの時間だぞー！アニキのことはおれが守る！"];

            var sakodaother = ["なんだおらー。触るとケガすんぞ～？", "アニキ～？どこっすかー？", "おれはな～アニキの右腕なんだぞ？すげぇだろ！", "あ、姐さん…アニキとは…その…どういうご関係で…？", "なんだおらー。触るとケガすんぞ～？", "アニキ～？どこっすかー？", "おれはな～アニキの右腕なんだぞ？すげぇだろ！", "あ、姐さん…アニキとは…その…どういうご関係で…？", "なんだおらー。触るとケガすんぞ～？"];

            var sakodatimesound = ["sakoda/morning", "sakoda/noon", "sakoda/eve", "sakoda/night"];
            var sakodaothersound = ["sakoda/0", "sakoda/1", "sakoda/2", "sakoda/3", "sakoda/0", "sakoda/1", "sakoda/2", "sakoda/3", "sakoda/0"];


            /* tetsuro */

            var tetsurotime = ["...おはよう", "...仕事", "...おかえり", "...おやすみ"];

            var tetsuroother = ["...ん？", "...あー", "...ん", "...どうした", "...ん？", "...あー", "...ん", "...どうした", "...ん？"];

            var tetsurotimesound = ["tetsuro/morning", "tetsuro/noon", "tetsuro/eve", "tetsuro/night"];
            var tetsuroothersound = ["tetsuro/0", "tetsuro/1", "tetsuro/2", "tetsuro/3", "tetsuro/0", "tetsuro/1", "tetsuro/2", "tetsuro/3", "tetsuro/0"];


            /* azami */

            var azamitime = ["☆", "☆", "☆", "☆"];

            var azamiother = ["☆", "☆", "☆", "☆", "☆", "☆", "☆", "☆", "☆"];

            var azamitimesound = ["azami/morning", "azami/noon", "azami/eve", "azami/night"];
            var azamiothersound = ["azami/0", "azami/1", "azami/2", "azami/3", "azami/0", "azami/1", "azami/2", "azami/3", "azami/0"];

            /* kumon */

            var kumontime = ["☆", "☆", "☆", "☆"];

            var kumonother = ["☆", "☆", "☆", "☆", "☆", "☆", "☆", "☆", "☆"];

            var kumontimesound = ["kumon/morning", "kumon/noon", "kumon/eve", "kumon/night"];
            var kumonothersound = ["kumon/0", "kumon/1", "kumon/2", "kumon/3", "kumon/0", "kumon/1", "kumon/2", "kumon/3", "kumon/0"];


            /* guy */

            var guytime = ["☆", "☆", "☆", "☆"];

            var guyother = ["☆", "☆", "☆", "☆", "☆", "☆", "☆", "☆", "☆"];

            var guytimesound = ["guy/morning", "guy/noon", "guy/eve", "guy/night"];
            var guyothersound = ["guy/0", "guy/1", "guy/2", "guy/3", "guy/0", "guy/1", "guy/2", "guy/3", "guy/0"];

/* main msg and sound arrays, morning = 0, day = 1, eve = 2, night = 3 */

            var timemsg = [];
            var othermsg = [];
            var timesound = [];
            var othersound = [];
            var page;
            var thehour = new Date().getHours();
            var favtext = document.getElementById("favtext");
            var rfavtext = document.getElementById("rfavtext");
            var favimg = document.getElementById("favimg");
            var talkrng;
            var savedimg, savedothermsg, savedothersound;
            var xpage;
            var xact;

/* check if localstorage has stored chara preferences, if not, dump sakuya */

            if (localStorage.getItem("localimg") === null || localStorage.getItem("localimg") === undefined || localStorage.getItem("localact") === null || localStorage.getItem("localact") === undefined || localStorage.getItem("localothermsg") === null || localStorage.getItem("localothermsg") === undefined) {
                timemsg = sakuyatime;
                othermsg = sakuyaother;
                timesound = sakuyatimesound;
                othersound = sakuyaothersound;
                favimg.setAttribute("src", "1/app/x.png");
                xpage = "sakuya";
                xact = "1";
            }
            else {
                savedothermsg = localStorage.getItem("localothermsg");
                othermsg = JSON.parse(savedothermsg);
                savedothersound = localStorage.getItem("localothersound");
                othersound = JSON.parse(savedothersound);
                savedimg = localStorage.getItem("localimg");
                favimg.setAttribute("src", savedimg);
                xpage = localStorage.getItem("localpage");
                xact = localStorage.getItem("localact");
            }

/* check if it's an event day & if so get msg/sound, dump them into time arrays, otherwise dump normal time arrays */

            var d = new Date();
            var xday = d.getDate();
            var nmonth = d.getMonth();
            var xmonth = nmonth + 1;
            var xevent;
            var xspan;
            var xsound;
            var xmsg;

/* testing detour: date switch and counter check */

            var urlsearch;
            var winhash;
            var winhashsplit;
            var winhashsplit2;
            var testwin = document.getElementById("tstf");
            var testframe = document.getElementById("tstd");
            var testwinclose = document.getElementById("tstdx");
            var hits = document.getElementById("hits");
            if (window.location.hash) {
                winhash = window.location.hash;
                if (winhash == "#c") {
                  hits.style.opacity = "1";
                }
                else if (winhash.length > 2) {
                  winhashsplit = winhash.split("?")
                  winhashsplit2 = winhashsplit[1].split("x");
                  xday = winhashsplit2[0];
                  xmonth = winhashsplit2[1];
                  testframe.src = "dtst.html";
                  testwin.style.display = "block";
                }
              testwinclose.onclick = function() {
                testwin.style.display = "none";
              };
            }

/* okay testing detour over, now back to the rest of the date event function */

            function eventsound(o) {
              xevent = o + xact;
              xspan = document.getElementById(xpage + xevent);
              xmsg = xspan.getAttribute("msg");
              xsound = xpage + "/z" + o + xact;
              timemsg[0] = xmsg;
              timemsg[1] = xmsg;
              timemsg[2] = xmsg;
              timemsg[3] = xmsg;
              timesound[0] = xsound;
              timesound[1] = xsound;
              timesound[2] = xsound;
              timesound[3] = xsound;
            }

            ifevent();

            function ifevent() {

              if ( xday == playerbirthday && xmonth == playerbirthmonth ) {
                eventsound("bday");
              }
              else if ( xday == 31 &&  xmonth == 12 ) {
                eventsound("newyear");
              }
              else if ( xday == 14 &&  xmonth == 2 ) {
                eventsound("valentine");
              }
              else if ( xday == 31 &&  xmonth == 10 ) {
                eventsound("halloween");
              }
              else if ( xday == 24 &&  xmonth == 12 ) {
                eventsound("christmas");
              }
              else if ( xday == 14 &&  xmonth == 3 ) {
                eventsound("whiteday");
              }
              else if ( xday == 1 &&  xmonth == 4 ) {
                eventsound("aprilfool");
              }
              else if ( xday == 5 &&  xmonth == 5 ) {
                eventsound("childrenday");
              }
              else if ( xday == 7 &&  xmonth == 7 ) {
                eventsound("tanbata");
              }
              else if ( xday == 31 &&  xmonth == 8 ) {
                eventsound("endofsummer");
              }
              else if ( xday == 27 &&  xmonth == 1 ) {
                eventsound("anniversary");
              }
              else if ( xday == 22 &&  xmonth == 1 ) {
                eventsound("azumabday");
              }
              else if ( xday == 12 &&  xmonth == 2 ) {
                eventsound("homarebday");
              }
              else if ( xday == 3 &&  xmonth == 12 ) {
                eventsound("hisokabday");
              }
              else if ( xday == 22 &&  xmonth == 2 ) {
                eventsound("tasukubday");
              }
              else if ( xday == 28 &&  xmonth == 12 ) {
                eventsound("tsumugibday");
              }
              else if ( xday == 23 &&  xmonth == 11 ) {
                eventsound("sakyobday");
              }
              else if ( xday == 2 &&  xmonth == 11 ) {
                eventsound("omibday");
              }
              else if ( xday == 11 &&  xmonth == 10 ) {
                eventsound("taichibday");
              }
              else if ( xday == 27 &&  xmonth == 9 ) {
                eventsound("juzabday");
              }
              else if ( xday == 9 &&  xmonth == 9 ) {
                eventsound("banribday");
              }
              else if ( xday == 1 &&  xmonth == 8 ) {
                eventsound("kazubday");
              }
              else if ( xday == 6 &&  xmonth == 6 ) {
                eventsound("misumibday");
              }
              else if ( xday == 30 &&  xmonth == 8 ) {
                eventsound("mukubday");
              }
              else if ( xday == 8 &&  xmonth == 7 ) {
                eventsound("yukibday");
              }
              else if ( xday == 21 &&  xmonth == 6 ) {
                eventsound("tenmabday");
              }
              else if ( xday == 15 &&  xmonth == 5 ) {
                eventsound("citronbday");
              }
              else if ( xday == 24 &&  xmonth == 4 ) {
                eventsound("itarubday");
              }
              else if ( xday == 9 &&  xmonth == 4 ) {
                eventsound("tsuzurubday");
              }
              else if ( xday == 30 &&  xmonth == 3 ) {
                eventsound("masumibday")
              }
              else if ( xday == 9 &&  xmonth == 3 ) {
                eventsound("sakuyabday");
              }
              else if ( xday == 90 &&  xmonth == 90 ) {
                eventsound("azamibday");
              }
              else if ( xday == 91 &&  xmonth == 91 ) {
                eventsound("kumonbday");
              }
              else if ( xday == 92 &&  xmonth == 92 ) {
                eventsound("guybday");
              }
              else if ( xday == 15 &&  xmonth == 4 ) {
                eventsound("chikagebday");
              }
              else {
                dumpconvoarrays(xpage);
              }

            }

              function dumpconvoarrays(p) {
                switch(p) {
                    case "azuma":
                        timemsg = azumatime;
                        othermsg = azumaother;
                        timesound = azumatimesound;
                        othersound = azumaothersound;
                    break;
                    case "hisoka":
                        timemsg = hisokatime;
                        othermsg = hisokaother;
                        timesound = hisokatimesound;
                        othersound = hisokaothersound;
                    break;
                    case "homare":
                        timemsg = homaretime;
                        othermsg = homareother;
                        timesound = homaretimesound;
                        othersound = homareothersound;
                    break;
                    case "tasuku":
                        timemsg = tasukutime;
                        othermsg = tasukuother;
                        timesound = tasukutimesound;
                        othersound = tasukuothersound;
                    break;
                    case "tsumugi":
                        timemsg = tsumugitime;
                        othermsg = tsumugiother;
                        timesound = tsumugitimesound;
                        othersound = tsumugiothersound;
                    break;
                    case "citron":
                        timemsg = citrontime;
                        othermsg = citronother;
                        timesound = citrontimesound;
                        othersound = citronothersound;
                    break;
                    case "itaru":
                        timemsg = itarutime;
                        othermsg = itaruother;
                        timesound = itarutimesound;
                        othersound = itaruothersound;
                    break;
                    case "masumi":
                        timemsg = masumitime;
                        othermsg = masumiother;
                        timesound = masumitimesound;
                        othersound = masumiothersound;
                    break;
                    case "sakuya":
                        timemsg = sakuyatime;
                        othermsg = sakuyaother;
                        timesound = sakuyatimesound;
                        othersound = sakuyaothersound;
                    break;
                    case "tsuzuru":
                        timemsg = tsuzurutime;
                        othermsg = tsuzuruother;
                        timesound = tsuzurutimesound;
                        othersound = tsuzuruothersound;
                    break;
                    case "kazu":
                        timemsg = kazutime;
                        othermsg = kazuother;
                        timesound = kazutimesound;
                        othersound = kazuothersound;
                    break;
                    case "misumi":
                        timemsg = misumitime;
                        othermsg = misumiother;
                        timesound = misumitimesound;
                        othersound = misumiothersound;
                    break;
                    case "muku":
                        timemsg = mukutime;
                        othermsg = mukuother;
                        timesound = mukutimesound;
                        othersound = mukuothersound;
                    break;
                    case "tenma":
                        timemsg = tenmatime;
                        othermsg = tenmaother;
                        timesound = tenmatimesound;
                        othersound = tenmaothersound;
                    break;
                    case "yuki":
                        timemsg = yukitime;
                        othermsg = yukiother;
                        timesound = yukitimesound;
                        othersound = yukiothersound;
                    break;
                    case "banri":
                        timemsg = banritime;
                        othermsg = banriother;
                        timesound = banritimesound;
                        othersound = banriothersound;
                    break;
                    case "juza":
                        timemsg = juzatime;
                        othermsg = juzaother;
                        timesound = juzatimesound;
                        othersound = juzaothersound;
                    break;
                    case "omi":
                        timemsg = omitime;
                        othermsg = omiother;
                        timesound = omitimesound;
                        othersound = omiothersound;
                    break;
                    case "sakyo":
                        timemsg = sakyotime;
                        othermsg = sakyoother;
                        timesound = sakyotimesound;
                        othersound = sakyoothersound;
                    break;
                    case "taichi":
                        timemsg = taichitime;
                        othermsg = taichiother;
                        timesound = taichitimesound;
                        othersound = taichiothersound;
                    break;
                    case "chikage":
                        timemsg = chikagetime;
                        othermsg = chikageother;
                        timesound = chikagetimesound;
                        othersound = chikageothersound;
                    break;
                    case "matsukawa":
                        timemsg = matsukawatime;
                        othermsg = matsukawaother;
                        timesound = matsukawatimesound;
                        othersound = matsukawaothersound;
                    break;
                    case "sakoda":
                        timemsg = sakodatime;
                        othermsg = sakodaother;
                        timesound = sakodatimesound;
                        othersound = sakodaothersound;
                    break;
                    case "tetsuro":
                        timemsg = tetsurotime;
                        othermsg = tetsuroother;
                        timesound = tetsurotimesound;
                        othersound = tetsuroothersound;
                    break;
                    case "azami":
                        timemsg = azamitime;
                        othermsg = azamiother;
                        timesound = azamitimesound;
                        othersound = azamiothersound;
                    break;
                    case "kumon":
                        timemsg = kumontime;
                        othermsg = kumonother;
                        timesound = kumontimesound;
                        othersound = kumonothersound;
                    break;
                    case "guy":
                        timemsg = guytime;
                        othermsg = guyother;
                        timesound = guytimesound;
                        othersound = guyothersound;
                    break;
                    default:
                        timemsg = sakuyatime;
                        othermsg = sakuyaother;
                        timesound = sakuyatimesound;
                        othersound = sakuyaothersound;
                }
              }

/* when app has loaded, show correct time message for current character */

              function homeload(m) {
                rfavtext.innerHTML = timemsg[m];
                $("#waitforvoicespinner").delay(1700).fadeIn(300);
                $("#iprofile").delay(1700).fadeIn(300, function(){
                    soundfile.setAttribute("src", ggg + timesound[m] + ".mp3");
                    soundfile.play();
                    soundfile.onplaying = function() {
                      $('#favtext').fadeIn(300);
                      $('#waitforvoicespinner').fadeOut(300, function(){
                        document.getElementById("waitforvoice").style.display = "none";
                      });
                    };
                });
              }

              switch(thehour) {
              case 20:
              case 21:
              case 22:
              case 23:
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
                  homeload(3);
              break;
              case 5:
              case 6:
              case 7:
              case 8:
              case 9:
              case 10:
                  homeload(0);
              break;
              case 11:
              case 12:
              case 13:
              case 14:
              case 15:
              case 16:
                  homeload(1);
              break;
              case 17:
              case 18:
              case 19:
                  homeload(2);
              break;
              }



/* when clicking on home screen chara, get random message from other array */

            favimg.onclick = function() {
            talkrng = Math.floor(Math.random() * 9);
            document.getElementById("waitforvoice").style.display="block";
            $('#favimg').animate({left: "-18.5%", bottom: "-7%", maxWidth: "137%", minWidth: "137%"}, 100);
            $('#favimg').animate({left: "-20%", bottom: "-8%", maxWidth: "140%", minWidth: "140%"}, 100);
            $('#waitforvoicespinner').fadeIn(300);
            $('#favtext').delay(30).fadeOut(300, function(){
                rfavtext.innerHTML = othermsg[talkrng];
                soundfile.setAttribute("src", ggg + othersound[talkrng] + ".mp3");
                soundfile.play();
                soundfile.onplaying = function(){
                  $('#favtext').fadeIn(300);
                  $('#waitforvoicespinner').fadeOut(300, function(){
                    document.getElementById("waitforvoice").style.display="none";
                  });
                };
            });
            };

/* get profile ID cards on click */

            var profiletrigger = document.getElementById("iprofile");
            var profilecoverdiv = document.getElementById("profilecover");
            var showcard;

            profiletrigger.onclick = function() {
              showcard = document.getElementById(xpage + "profile");
              showcard.style.display = "block";
              profilecoverdiv.style.display = "block";
              document.getElementById("profilecover2").style.display = "block";
              document.getElementById("waitforvoice").style.display="block";
              $("#waitforvoicespinner").fadeIn(300, function(){
                $("#waitforvoicespinner").delay(10).fadeOut(300, function(){
                  $('#profilecard').delay(50).animate({right: "-12px"}, 150, function(){
                    document.getElementById("waitforvoice").style.display="none";
                  });
                });
              });
            };

/* fade out profile card on click */

            profilecoverdiv.onclick = function() {
              document.getElementById("waitforvoice").style.display="block";
              $("#waitforvoicespinner").fadeIn(300, function(){
                $("#waitforvoicespinner").delay(10).fadeOut(300, function(){
                  $('#profilecard').delay(50).animate({right: "-315px"}, 150, function(){
                    showcard.style.display = "none";
                    document.getElementById("profilecover2").style.display = "none";
                    profilecoverdiv.style.display = "none";
                    document.getElementById("waitforvoice").style.display="none";
                  });
                });
              });
            };


/* navigation clicking... */

            var homebutton = document.getElementById("homebutton");
            var cardbutton = document.getElementById("cardbutton");
            var profilebutton = document.getElementById("profilebutton");
            var infobutton = document.getElementById("infobutton");
            var cloudscon = document.getElementById("clouds");
            var homecon = document.getElementById("homecontainer");
            var cardscon = document.getElementById("cardcontainer");
            var infocon = document.getElementById("infocontainer");
            var profilecon = document.getElementById("profilecontainer");
            var navbar = document.getElementById("navbar");

            function closeprofile() {
              profilebutton.style.background = "#eeeeee";
              profilecon.style.display = "none";
              profilecon.style.marginLeft = "-150%";
              profilecon.style.opacity = "0";
              document.getElementById("profilecontent").style.display = "none";
            }

            function closecardalbum() {
              cardbutton.style.background = "#eeeeee";
              cardscon.style.display = "none";
              cardscon.style.marginTop = "-150%";
              cardscon.style.opacity = "0";
              document.getElementById("cthumbs").style.display = "none";
            }

            function closeinfo() {
              infobutton.style.background = "#eeeeee";
              infocon.style.display = "none";
              infocon.style.marginTop = "-150%";
              infocon.style.opacity = "0";
              document.getElementById("infocontent").style.display = "none";
            }

            function closehome() {
              homebutton.style.background = "#eeeeee";
              homecon.style.display = "none";
              soundfile.pause();
              soundfile.setAttribute("src", "");
              favtext.style.display = "none";
              favimg.style.left = "-150%";
              cloudscon.style.top = "-300px";
              document.getElementById("iprofile").style.display = "none";
              document.getElementById("waitforvoicespinner").style.display = "none";
              document.getElementById("dontclickhomeagain").style.display = "none";
            }

/* clicking home button */

            homebutton.onclick = function() {
            homebutton.style.background = "#FFDEE0";
            homecon.style.display = "block";
            document.getElementById("dontclickhomeagain").style.display = "block";
            //closeprofile();
            closecardalbum();
            closeinfo();
            $("#clouds").animate({ top: "-50px"}, 200, function(){
              $("#favimg").animate({ left: "-20%"}, 200);
            });


/* part of homebutton click function; changes text bubble to time message of chara whose arrays were dumped into time/other/sound */

            ifevent();

            function clickedhome(k) {
              document.getElementById("waitforvoice").style.display="block";
              rfavtext.innerHTML = timemsg[k];
              soundfile.setAttribute("src", ggg + timesound[k] + ".mp3");
              $("#waitforvoicespinner").delay(200).fadeIn(300);
              $("#iprofile").delay(200).fadeIn(300, function(){
                soundfile.play();
                soundfile.onplaying = function() {
                  $('#favtext').fadeIn(300);
                  $('#waitforvoicespinner').fadeOut(300, function(){
                    document.getElementById("waitforvoice").style.display="none";
                  });
                };
              });
            }

                thehour = new Date().getHours();
                    switch(thehour) {
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        clickedhome(3);
                    break;
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        clickedhome(0);
                    break;
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                        clickedhome(1);
                    break;
                    case 17:
                    case 18:
                    case 19:
                        clickedhome(2);
                    break;
                    }
                };

/* clicking card album button */

            cardbutton.onclick = function() {
            cardbutton.style.background = "#FFDEE0";
            cardscon.style.display = "block";
            //closeprofile();
            closeinfo();
            closehome();
              $("#cardcontainer").animate({ marginTop: "20px", opacity: 1}, 250, function(){
                $("#cthumbs").delay(200).fadeIn(250);
              });
            };

/* clicking profile button (temporary measure) */

            profilebutton.onclick = function() {
            // under construction message...
            document.getElementById("waitforvoice").style.display = "block";
            document.getElementById("profileflash").style.display = "block";
            $('#profileflash').animate({bottom: "39px"}, 150, function(){
              $('#profileflash').delay(900).animate({bottom: "0px"}, 150, function(){
                document.getElementById("profileflash").style.display = "none";
                document.getElementById("waitforvoice").style.display = "none";
              });
            });
            /*
            cardbutton.style.background = "#eeeeee";
            homebutton.style.background = "#eeeeee";
            profilebutton.style.background = "#FFDEE0";
            infobutton.style.background = "#eeeeee";
            favtext.style.display = "none";
            document.getElementById("homecontainer").style.display = "none";
            document.getElementById("cardcontainer").style.display = "none";
            document.getElementById("cthumbs").style.display = "none";
            document.getElementById("profilecontainer").style.display = "block";
            document.getElementById("infocontainer").style.display = "none";
            document.getElementById("infocontent").style.display = "none";
            soundfile.pause();
            soundfile.setAttribute("src", "");
            favimg.style.left = "-150%";
            cloudscon.style.top = "-300px";
            document.getElementById("iprofile").style.display = "none";
            cardscon.style.marginTop = "-150%";
            cardscon.style.opacity = "0";
            infocon.style.marginTop = "-150%";
            infocon.style.opacity = "0";
            $("#profilecontainer").animate({ marginLeft: "25px", opacity: 1}, 250, function(){
              $("#profilecontent").delay(200).fadeIn(250);
            });
            */
            };

/* info button */

            infobutton.onclick = function() {
            infobutton.style.background = "#FFDEE0";
            infocon.style.display = "block";
            //closeprofile();
            closecardalbum();
            closehome();
              $("#infocontainer").animate({ marginTop: "20px", opacity: 1}, 250, function(){
                $('#infocontent').delay(200).fadeIn(250);
              });
            };

/* navigation click functions end here */
/* card album thumbnail clicking functions */
/* make a list of thumbnail cards and get info from card attributes */

            var thumbs = document.getElementsByClassName("thumb");
            var cardtop = document.getElementById("cardtop");
            var blackout = document.getElementById("blackout");
            var viewbox = document.getElementById("viewbox");
            var selectcard = document.getElementById("selectcard");
            var cardcontainer = document.getElementById("cardcontainer");
            var thumbsrc, thumbsrcslice, thumbfull, thumbtrans, cardname, i;
            var viewboxheight, viewboxheighthalf;
            var cardload = document.getElementById("cardload");
            var cardloadspinner = document.getElementById("cardloadspinner");
            var act;
            var doubleclickprotect = document.getElementById("doubleclickprotect");

            var getinfo = function() {
                doubleclickprotect.style.display = "block";
                cardname = this.getAttribute("cardname");
                thumbsrc = this.getAttribute("src");
                thumbsrcslice = thumbsrc.slice(0, -4);
                thumbfull = thumbsrcslice + "full.png";
                thumbtrans = thumbsrcslice + "trans.png";
                act = this.getAttribute("act");
                cardtop.innerHTML = cardname;
                blackout.style.display = "block";
                viewbox.style.display = "block";
                cardcontainer.style.display = "none";
                navbar.style.display = "none";
                selectcard.setAttribute("src", thumbfull);
                page = this.getAttribute("page");
                cardloadspinner.style.display = "block";
                cardload.style.display = "block";
                selectcard.onload = function() {
                  viewboxheight = viewbox.offsetHeight;
                  viewboxheighthalf = viewboxheight / 2;
                  viewbox.style.top = "calc(50% - " + viewboxheighthalf + "px)";
                  $('#cardloadspinner').delay(200).fadeOut(300);
                  $('#cardload').delay(500).fadeOut(100, function(){
                    $("#viewbox").animate({ opacity: 1}, 100, function(){
                      doubleclickprotect.style.display = "none";
                    });
                  });
                };

            };

/* fire getinfo on card click */

            for (i = 0; i < thumbs.length; i++) {
            thumbs[i].addEventListener('click', getinfo, false);
            }

/* close the card view on click */

            function closecard() {
              viewbox.style.display = "none";
              viewbox.style.opacity = "0";
              blackout.style.display = "none";
            cardcontainer.style.display = "block";
            navbar.style.display = "block";
              selectcard.setAttribute("src", "");
              homeset.innerHTML = "メーンにする";
              $('#homeset').removeClass('setyay loadyay');
            }

            selectcard.addEventListener("click", closecard);
            blackout.addEventListener("click", closecard);

/* set selected card to home and get the right sound files */

            var localothermsg, localothersound, localimg;
            var homeset = document.getElementById("homeset");

            homeset.onclick = function() {
              doubleclickprotect.style.display = "block";
              homeset.innerHTML = "ロード中…";
              $('#homeset').addClass('loadyay');
              favimg.setAttribute("src", "");
              xpage = page;
              xact = act;
              dumpconvoarrays(page);
              favimg.setAttribute("src", thumbtrans);
              favimg.onload = function() {
                $('#homeset').addClass('setyay');
                homeset.innerHTML = "成功";
                doubleclickprotect.style.display = "none";
              };
              /* save the set card in local storage */
              try {
                localStorage.setItem("localothermsg", JSON.stringify(othermsg));
                localStorage.setItem("localothersound", JSON.stringify(othersound));
                localStorage.setItem("localimg", thumbtrans);
                localStorage.setItem("localpage", xpage);
                localStorage.setItem("localact", xact);
              } catch (e) { /* didn't work */ }

            };

/* sorting toggle */

            var toggle = 1;
            var cardflower = document.getElementById("cardflower");
            cardflower.onclick = function() {
              if (toggle == 1) {
                cardflower.setAttribute("src", "1/app/cardflower2.svg");
                document.getElementById("rsort").style.display = "none";
                document.getElementById("csort").style.display = "block";
                toggle = 2;
              }
              else {
                cardflower.setAttribute("src", "1/app/cardflower.svg");
                document.getElementById("rsort").style.display = "block";
                document.getElementById("csort").style.display = "none";
                toggle = 1;
              }

            };

  }

};
