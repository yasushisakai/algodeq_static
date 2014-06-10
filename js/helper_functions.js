//////////////////////////////////////////////////////////////
//  helper functions
/////////////////////////////////////////////////////////////

var stations = ["aioi", "aiga", "aikappu", "aikamachi", "aikawa", "aikoishida", "aizan", "aidaigakubuminamiguchi", "aichimito", "aizuarakai", "aizuoshio", "aizugamo", "aizukawaguchi", "aizuki", "aizukogen", "aizukosugawa", "aizusakamoto", "aizusansondojo", "aizushiozawa", "aizushimogo", "aizutakada", "aizutajima", "aizutoyokawa", "aizunakagawa", "aizunagano", "aizunishikata", "aizubange", "aizuhinohara", "aizuhongo", "aizuma", "aizumizunuma", "aizumiyashita", "aizuyanaizu", "aizuyokota", "aizuwakamatsu", "aina", "aino", "ainora", "ainoki", "ainosatokyoikudai", "ainosatokoen", "ainonai", "ainono", "aiba", "aihara", "aibetsu", "aimoto", "aira", "airandokitaguchi", "airandosenta", "ao", "aoidake", "aozu", "aokura", "aozasa", "aoshima", "aotsuka", "aoto", "aonuma", "aonogahara", "aonogo", "aonoyama", "aoba", "aobadai", "aobadori", "aohara", "aobe", "aomi", "aohori", "aomonoyokocho", "aomori", "aoya", "aoyagi", "aoyagicho", "aoyama", "aoyamaitchome", "aoyamacho", "akai", "akaigawa", "akaike", "akaiwa", "akaiwaguchi", "akaoka", "akagawa", "akagi", "akakuraonsen", "akasaka", "akasakaue", "akasakata", "akasakamitsuke", "akasaki", "akasako", "akashi", "akashina", "akase", "agata", "akaji", "akatsuka", "akatsukigakuemmae", "akatsuchisaka", "akano", "agano", "akabane", "akabaneiwabuchi", "akabanebashi", "akabira", "akabuchi", "agaho", "akaboshi", "akahori", "akama", "akamizu", "akameguchi", "akayu", "agarimichi", "agawa", "aki", "agi", "akiaga", "akimuro", "akikameyama", "akigawa", "akikawajiri", "akisaizaki", "akishima", "akita", "akitashirakami", "akitsu", "akinagatsuka", "akinakano", "akinagahama", "akihabara", "akiyaguchi", "akiyama", "akui", "agui", "akune", "akuragawa", "age", "ageo", "ageki", "akechi", "aketo", "akeno", "akebonocho", "akebonochohigashimachi", "akebonobashi", "agematsu", "akogashima", "akogi", "asa", "asaka", "asakadai", "asakanagamori", "asagaya", "asakayama", "asakawa", "asagishi", "asagiri", "asakusa", "asakusabashi", "asakura", "asakuraekimae", "asakurakaido", "asakurajinjamae", "asaji", "asashiobashi", "asanai", "asanamachi", "asanami", "asano", "asahi", "asahiekimaedori", "asahiotsuka", "asahigaoka", "asahikawa", "asahikawayojo", "asahidori", "asahino", "asahihama", "asahimae", "asahimachitchome", "asahimachisanchome", "asabu", "azabujuban", "asama", "azami", "azamino", "azamui", "asamushionsen", "asari", "ashio", "ajioka", "ajigaura", "ashikaga", "ashikagashi", "ashigakubo", "ajigasawa", "ashikajima", "ashigase", "ashigara", "ashigawa", "ajikawaguchi", "ajiki", "ajisaka", "ashisawa", "ajisu", "ashidaki", "ashidachi", "ajina", "ajinahigashi", "ashinokoen", "ashinomakionsen", "ashinomakionsemminami", "ashihara", "ashiharacho", "ashiharabashi", "ashibetsu", "ajima", "ashimori", "ashiya", "ashiyagawa", "ajiyoshi", "ashoro", "ajiro", "asuka", "asukayama", "azusabashi", "azumada", "azumadasakaue", "azumioiwake", "azumikutsukake", "asumomae", "asuwa", "aseri", "aso", "aso", "asozu", "azono", "asoshimodajofureaionsen", "asoshirakawa", "atago", "atagobashi", "atashika", "adachi", "atami", "atawa", "atsu", "atsuga", "atsugi", "akkeshi", "asso", "atsuta", "azuchi", "attoko", "atsunai", "atsunakatonya", "appikogen", "atsubetsu", "azuma", "atsumionsen", "aterazawa", "ato", "adogawa", "anagawa", "ananai", "anabuki", "anabe", "anamizu", "anamorinari", "anayama", "anan", "aniai", "anihata", "animaeda", "animatagi", "anegasaki", "anebetsu", "ano", "ano", "abashiri", "abiki", "abiko", "abikocho", "abikomae", "abikomichi", "abira", "abukuma", "aputoichishiro", "aburakawa", "aburatsu", "aburaden", "aburahi", "afun", "abe", "abekawa", "abeno", "abeyamakoen", "abozaki", "aboshi", "amariki", "amagasaka", "amagasaki", "amagasakisentapurumae", "amagase", "amagatsuji", "amagi", "amago", "amaji", "amatsu", "amanoiwato", "amanohashidate", "amaharashi", "amaya", "amami", "amariko", "amarube", "amarume", "amino", "amenomiya", "amori", "ayaori", "ayashi", "ayase", "ayanocho", "ayabe", "ayameike", "ayamekoen", "ayaragi", "ayukai", "ayukawa", "arai", "araijuku", "araimachi", "araiyakushimae", "arao", "aragakashinokidai", "arakawaitchumae", "arakawaoki", "arakawakuyakushomae", "arakawashakomae", "arakawananachome", "arakawanichome", "arakawayuenchimae", "araki", "arashima", "arashiyama", "arase", "aratano", "aratahachiman", "aratamabashi", "arato", "arahata", "arahama", "aramachi", "aramoto", "araya", "arayashimmachi", "arayamae", "ariake", "ari", "arigawa", "arie", "arioka", "arikabe", "arisa", "arisugawa", "arita", "arito", "arihata", "arimaonsen", "arimagawa", "arimaguchi", "arimatsu", "arimayoshikawa", "arimineguchi", "ariyoshi", "awa", "awakaishi", "awamatsu", "awai", "awaikeda", "awaotani", "awaomiya", "awakainan", "awagasaki", "awakatsuyama", "awakamo", "awakamogawa", "awakawaguchi", "awakawashima", "awakawabata", "awakuraonsen", "awakominato", "awaza", "awaji", "awajicho", "awatachibana", "awazu", "awatomida", "awanakashima", "awano", "awahanda", "awafukui", "awaya", "awayamakawa", "awaraonsen", "awarayunomachi", "anjo", "anjinzuka", "anzen", "antaroma", "ando", "antoku", "annaka", "annakaharuna", "anryumachi", "i", "ioka", "igura", "izakaonsen", "ijima", "ida", "idaoka", "idabashi", "izuka", "izume", "inuma", "inora", "ibama", "imori", "iyama", "ieki", "iejigawa", "ienaka", "iehisa", "ieyama", "iojimae", "ioki", "iogi", "iga", "igaueno", "ikaushi", "igakambe", "igakozu", "ikazaki", "igashima", "igami", "igaya", "ikarigaseki", "ikawa", "ikawasakura", "ikawashi", "ikawadani", "ikisan", "ikusabata", "ikuji", "ikuta", "ikutahara", "ikutora", "ikuno", "ikunoya", "igumi", "ikura", "ikegami", "ikeshita", "ikejiri", "ikejiriohashi", "ikeda", "ikedaen", "ikezuki", "ikeno", "ikenoe", "ikenora", "ikenotani", "ikenobe", "ikeba", "ikebukuro", "ikebe", "ikoinohiroba", "ikoinomura", "ikoma", "ikomasanjo", "isa", "isaida", "isahaya", "isahayahigashikokomae", "isaryo", "isawaonsen", "ishi", "ishiuchi", "ishiuchidamu", "ishioka", "ishiokaminamidai", "ishiga", "ishikaki", "ishigami", "ishigamimae", "ishikarikanazawa", "ishikaritsukigata", "ishikaritobetsu", "ishikarinumata", "ishikarifutomi", "ishikawa", "ishikawadai", "ishikawacho", "ishikiri", "ishikura", "ishige", "ishikoshi", "ishizai", "ishiji", "ishida", "ishizu", "ishizugawa", "ishizuchiyama", "ishitegawakoen", "ishidoriya", "ishino", "ishinomaki", "ishiba", "ishibashi", "ishihama", "ishiharamachi", "ishibe", "ishibotoke", "ishiya", "ishiyagawa", "ishiyama", "ishiyamadera", "ishiyamadori", "ijuin", "ijiri", "ishiwara", "ishinden", "izuatagawa", "izuinatori", "izue", "izuokawa", "izukyushimoda", "izukogen", "isuzugaoka", "isuzugawa", "izutaga", "izunagaoka", "izunitta", "izuhokkawa", "izumi", "izumiotsu", "izumiomiya", "izumigaoka", "izumigo", "izumizaki", "izumisano", "izumisawa", "izumisunagawa", "izumita", "izumitaikukan", "izumitamagawa", "izumichuo", "izumitottori", "izumino", "izumihashimoto", "izumifuchu", "izume", "izumokagakukampakutaummae", "izumosakane", "izumozaki", "izumoshi", "izumojinzai", "izumotaishamae", "izumodaito", "izumominari", "izumoyashiro", "izumoyokota", "isurugi", "izumma", "iseasahi", "iseishibashi", "iseueno", "iseoi", "iseokitsu", "isekashiwazaki", "isekamakura", "isekawaguchi", "isekawashima", "isegi", "isesaki", "isezakichojamachi", "iseshi", "iseda", "isetakehara", "isenakagawa", "isenakahara", "isehata", "isehatta", "isehara", "isematsumoto", "iseyachi", "isewakamatsu", "isoichi", "iso", "isogo", "isozaki", "isotake", "isonora", "isohara", "isobunnai", "isobe", "isoyama", "itaga", "idagawa", "idagiso", "itakuratoyodaimae", "itako", "itano", "itabashi", "itabashikuyakushomae", "itabashihoncho", "itabu", "itami", "idamichi", "itamochi", "itaya", "itayado", "itayanagi", "ichio", "ichioka", "ichigao", "ichigaya", "ichikawa", "ichikawaono", "ichikawashiohama", "ichikawadaimon", "ichikawahommachi", "ichikawamama", "ichiki", "ichishi", "ichijima", "ichijoji", "ichijodani", "ichijobashi", "ichishiro", "ichida", "ichitana", "ichitsubo", "ichinami", "ichinuno", "ichinoe", "ichinokawa", "ichinose", "ichinoseki", "ichinotsubo", "ichinotori", "ichinohe", "ichinobe", "ichinomiya", "ichinomoto", "ichinowatari", "ichinowari", "ichiba", "ichibataguchi", "ichihana", "ichihara", "ichibu", "ichiburi", "ichibe", "itsukaichi", "itsukamachi", "issha", "isshochi", "itsutsubashi", "ippommatsu", "izurodori", "ide", "ido", "itoi", "itoigawa", "itoizawa", "ito", "idogaya", "itozaki", "itoshino", "itoda", "itonuki", "ina", "inae", "inao", "inaoshima", "inakadate", "inakamisato", "inagi", "inakita", "inaginaganuma", "inage", "inagekaigan", "inako", "inakozawa", "inazawa", "inashi", "inashibetsu", "inashimmachi", "inazusa", "inada", "inatajima", "inadazutsumi", "inachuo", "inazumikoen", "inadera", "inatoi", "inano", "inabafunaoka", "inabayashiro", "inahara", "inafukuoka", "inaho", "inahongo", "inamatsushima", "inami", "inamuragasaki", "inayawata", "inari", "inariguchi", "inaricho", "inarimachi", "inariyama", "inariyamakoen", "inawashiro", "inukai", "inukawa", "inuzuka", "inubo", "inuyama", "inuyamaguchi", "inuyamayuen", "ino", "ino", "inoe", "inoekimae", "inokashirakoen", "inokuchi", "inoshogyomae", "inotani", "inotsuki", "inonada", "ihara", "ibara", "ibaraichi", "ibaraki", "ibarakishi", "iharanosato", "ibarame", "ibi", "ibi", "ibusuki", "iburihashi", "iho", "imai", "imaike", "imaizumi", "imaise", "imaida", "imaichi", "imaihamakaigan", "imagawa", "imagawakappa", "imazato", "imajuku", "imajo", "imazu", "imadegawa", "imabashi", "imabari", "imabuku", "imafukutsurumi", "imafune", "imabetsu", "imamiya", "imamiyaebisu", "imayama", "imari", "iya", "iyaguchi", "iyoizushi", "iyoiwaki", "iyoozu", "iyoohira", "iyokaminada", "iyokameoka", "iyoki", "iyokomatsu", "iyosaijo", "iyosakurai", "iyosangawa", "iyoshi", "iyoshirataki", "iyotachikawa", "iyotachibana", "iyodoi", "iyotomita", "iyonagahama", "iyonakayama", "iyohimi", "iyohirano", "iyohojo", "iyomishima", "iyomiyanoshita", "iyomiyoshi", "iyoyokota", "iyoyoshida", "iyowake", "iragawa", "iri", "iriake", "iriuda", "irieoka", "iriso", "irinaka", "irino", "irihirose", "iriya", "iriyamase", "irumashi", "ireji", "iwai", "iwaizumi", "iwaki", "iwakiasakawa", "iwakishi", "iwakishikawa", "iwakiota", "iwakitanakura", "iwakitokiwa", "iwakihanawa", "iwakiminato", "iwakimoriyama", "iwakiri", "iwakuni", "iwakura", "iwakuraji", "iwasawa", "iwashima", "iwajuku", "iwashiro", "iwashiroshimizu", "iwase", "iwasehama", "iwata", "iwatakiguchi", "iwatazaka", "iwadate", "iwatsuka", "iwatsuki", "iwapparasukijomae", "iwade", "iwateioka", "iwateokawa", "iwatekamigo", "iwatekariya", "iwatekawaguchi", "iwatenumakunai", "iwatefutsukamachi", "iwatefunakoshi", "iwadeyama", "iwatewainai", "iwato", "iwanami", "iwanuma", "iwane", "iwanebashi", "iwano", "iwanoshita", "iwanome", "iwahana", "iwahara", "iwafune", "iwafunemachi", "iwama", "iwamatsu", "iwami", "iwamikawagoe", "iwamikawamoto", "iwamizawa", "iwamitsuga", "iwamitsuda", "iwamifukumitsu", "iwamimatsubara", "iwamiyanaze", "iwamiyokota", "iwamura", "iwamurada", "iwamuro", "iwamoto", "iwamotocho", "iwaya", "iwayabashi", "iwayama", "inzaimakinohara", "innai", "innosho", "imba", "imbanihonidai", "imbara", "imbe", "ueki", "uesupatsubakiyama", "ueta", "ueda", "uedai", "uedahara", "uedo", "uenae", "ueno", "uenokachimachi", "uenoshi", "uenoshiba", "uenodobutsuennishien", "uenodobutsuenhigashien", "uenohara", "uenohirokoji", "uebayashi", "uehommachi", "uematsu", "uemura", "uoichibadori", "uosaki", "uozaki", "uozumi", "uozu", "uonumakyuryo", "uonumatanaka", "uonumanakajo", "ukai", "ugata", "ukahongo", "ukawa", "ukiana", "ukiha", "ukibuchi", "ukimafunado", "ukui", "uguisuzawa", "uguisuzawakogyokokomae", "uguisudani", "uguisuno", "uguisunomori", "ugusu", "uge", "ugoizuka", "ugoiwaya", "ugoshijima", "ugoota", "ugokameda", "ugosakai", "ugonakazato", "ugonagatoro", "ugonagano", "ugohonjo", "ugoyotsuya", "usa", "usami", "uji", "ujie", "ushio", "ushigahara", "ushiku", "ushikubo", "ushigomekagurazaka", "ushigomeyanagicho", "ushita", "ushida", "ujidanchimae", "ushitsu", "ushizu", "ujinagochome", "ujinasanchome", "ujinanichome", "ujinayonchome", "ushinoshima", "ushinohama", "ushinoya", "ushihama", "ushibuchi", "ushibuchidanchimae", "ushima", "ushiyama", "ujiyamada", "ushirogata", "usu", "usuki", "usugi", "usukitchome", "usuda", "uzumasa", "uzenoyama", "uzenkanezawa", "uzenkomatsu", "uzenzennami", "uzentakamatsu", "uzenchitose", "uzentsubaki", "uzentoyosato", "uzennagasaki", "uzennakayama", "uzennarita", "uzennumazawa", "uzemmatsuoka", "uzemmizusawa", "uzenyamabe", "utago", "utatsu", "utazu", "utanai", "uchiumi", "uchigamaki", "uchiko", "uchigo", "uchigoshi", "uchisaiwaicho", "uchijuku", "uchita", "uchida", "uchide", "uchina", "uchinada", "uchino", "uchinoda", "uchinomaki", "uchihara", "uchiyama", "uzui", "utsuigawa", "utsutsugawa", "uddeitaunchuo", "utsunomiya", "utsubuna", "utsube", "utsubo", "utsumi", "uto", "uto", "udono", "utoma", "unazuki", "unazukionsen", "unuma", "unumajuku", "une", "uneno", "unebi", "unebigoryomae", "uno", "unoki", "unoke", "unoshima", "unosumai", "unobe", "unomachi", "ubashima", "ubado", "ubara", "ube", "ubeshinkawa", "ubemisaki", "umatate", "umahori", "umamichi", "umi", "umishibaura", "umijiri", "uminora", "uminokuchi", "uminokoenshibaguchi", "uminokoemminamiguchi", "uminonakamichi", "umegaoka", "umegasawa", "umegatani", "umegato", "umezako", "umesato", "umejima", "umeda", "umetsubo", "umedoi", "umenotsuji", "umenomoto", "umeyashiki", "umeyama", "uyagawa", "urausu", "uraga", "urakami", "urakamiekimae", "urakamishakomae", "urakawa", "uragawara", "urasa", "urashuku", "urata", "uratakannon", "uranosaki", "urahoro", "uramoto", "urayasu", "urayama", "urayamaguchi", "urawa", "urawamisono", "urizura", "urusammachi", "urushiyama", "uwagoromo", "uwajima", "unga", "undokoen", "undokoemmae", "ei", "eiokawa", "eigashima", "eidanakatsuka", "eidannarimasu", "einomaru", "eifukucho", "eiwa", "ekaku", "eganosho", "ekawasaki", "egi", "ekimae", "ekiya", "egira", "eguchi", "ekoda", "esaka", "esaki", "esashi", "ejima", "ejiri", "esumi", "esojima", "eda", "edagawa", "edamitsu", "echigawa", "echigoakatsuka", "echigoishiyama", "echigoiwasawa", "echigoiwatsuka", "echigooshima", "echigokatakai", "echigokanamaru", "echigokawaguchi", "echigokangawa", "echigoshikawatari", "echigoshimoseki", "echigosuhara", "echigosone", "echigotakiya", "echigotazawa", "echigotanaka", "echigonakazato", "echigohayakawa", "echigohirose", "echigohirota", "echigohorinochi", "echigomizusawa", "echigoyuzawa", "echizenono", "echizenomiya", "echizenkaihotsu", "echizenshimabashi", "echizenshimoyama", "echizenshimbo", "echizentakada", "echizentakewara", "echizentano", "echizentogo", "echizentomida", "echizennonaka", "echizenhanando", "echizenyakushi", "etchuizumi", "etchuebara", "etchukokubu", "etchusango", "etchujima", "etchudaimon", "etchunakagawa", "etchunakajima", "etchunakamura", "etchufunahashi", "etchumiyazaki", "etchuyatsuo", "etchuyamada", "ezuriko", "edogawa", "edogawadai", "edogawabashi", "edobashi", "ena", "enai", "eniwa", "enora", "enokido", "enokimachi", "enokimoto", "enoshima", "eba", "ebata", "ebara", "ebaranakanobu", "ebaramachi", "ebi", "ebie", "ebishima", "ebisu", "ebisucho", "ebitsu", "ebina", "ebino", "ebinoino", "ebinowae", "efue", "ebeotsu", "ebetsu", "emi", "emukaeshikamachi", "era", "erinono", "engaru", "engyojiguchi", "enkobashicho", "enza", "enzan", "enshukamijima", "enshugansuiji", "enshukobayashi", "enshukomatsu", "enshushibamoto", "enshunishigasaki", "enshuhikuma", "enshubyoimmae", "enshumori", "enden", "endo", "entoku", "emmachi", "oikawa", "oitama", "oitsu", "oirase", "oiwake", "oiwakeguchi", "oka", "ogisawa", "ogita", "ogimachi", "oji", "ojiekimae", "oshio", "ojikamiya", "ojikoen", "ojiyama", "oda", "ochi", "obaku", "omi", "omimazu", "omigawa", "omishiotsu", "omijingumae", "omitakashima", "ominagaoka", "ominakasho", "omihachiman", "omimaiko", "ome", "omekaido", "ora", "oe", "oezuka", "oasa", "oaso", "oada", "oami", "oarai", "oike", "oikeikoinomori", "oikeibajomae", "oikeyuen", "oishi", "oishida", "oizumi", "oizumigakuen", "oizumihigashi", "oiso", "oita", "oitai", "oitadaigakumae", "oichi", "oimachi", "oiwa", "ouchi", "ouchiyama", "oura", "ourakaigandori", "ouratenshudoshita", "oe", "oekokomae", "oeyamaguchinaiku", "ooka", "ookashomae", "ookayama", "oga", "okaido", "ogaki", "ogata", "ogane", "okama", "okaribe", "okawa", "okawadai", "okawadamukoen", "okawachi", "okawano", "okawara", "ogawara", "oki", "ogi", "okishi", "okuki", "okusa", "oguchi", "okubo", "okuma", "okuradani", "okurayama", "okuwa", "ogo", "ogoe", "ozai", "osaka", "osakabenobashi", "osakakyoikudaimae", "osakakuko", "osakako", "osakasayamashi", "osakajokitazume", "osakajokoen", "osakatemmangu", "osakadomumaechiyozaki", "osakabijinesupaku", "osaki", "osakihirokoji", "osakura", "osato", "osawa", "ozawanai", "oshio", "oshida", "oshinozu", "oshima", "ojima", "oshimizu", "oja", "osho", "oshoji", "oshirakawa", "osukannon", "osugi", "osumi", "osumiogawara", "osuminatsui", "osumiyokogawa", "ozeki", "ozone", "osoneura", "ozore", "ota", "odai", "odaka", "otagawa", "otaki", "otakionsen", "otagiri", "otaguchi", "otake", "otago", "odashi", "odate", "otani", "otabe", "odara", "otsu", "otsuka", "otsukaekimae", "otsuka・teikyodaigaku", "otsuki", "otsuko", "otsuchi", "otsumachi", "otsuru", "otemachi", "otera", "oto", "odotsu", "odori", "otoshi", "odose", "otoba", "odomari", "odomi", "otori", "otori", "odoro", "onaka", "onakayama", "onari", "onishi", "oniwa", "onuki", "onuma", "onumakoen", "ono", "onora", "onogo", "onoshimo", "onojo", "onodai", "onohara", "onomachi", "onori", "ohashi", "obashi", "ohashidori", "obatake", "ohato", "obanen", "ohara", "obara", "obarino", "ohito", "ohirashita", "ohiradai", "ohirota", "obu", "obukuro", "obuke", "ofuna", "ofunato", "oho", "oboke", "ohori", "ohorikoen", "oma", "omae", "omagari", "omagoshi", "omachi", "omama", "omi", "omika", "omisaki", "omizo", "omitsu", "ominato", "omiya", "omiyakoen", "omuta", "omura", "omuro", "omoto", "omori", "omori・kinjogakuimmae", "omorikaigan", "omoridai", "omorimachi", "oya", "oyakaigan", "oyachi", "oyabu", "oyama", "oyamazaki", "owada", "owani", "owanionsen", "oka", "oga", "ogauchi", "ogakie", "okazaki", "okazakikoemmae", "okazakimae", "okashinai", "ogase", "okada", "ogata", "okadaura", "okachimachi", "okadera", "okadomekofuku", "okaba", "okabana", "okabe", "okamachi", "okami", "okamedo", "okamoto", "okaya", "okayama", "okayamaekimae", "ogawa", "ogawago", "ogawakokoshita", "ogawamachi", "ogi", "ogikawa", "ogikubo", "okitsu", "ogitsu", "okinashima", "okinami", "ogino", "oginojo", "ogifushi", "okimatsushima", "ogyu", "oku", "okuani", "okuizumi", "okuoikojo", "okusawa", "ogushigo", "okuda", "okutama", "okucho", "okudokai", "okunai", "okunakayamakogen", "oguni", "okunikkawa", "okuhamanako", "okuhidaonsenguchi", "ogura", "oguradai", "okegawa", "oketo", "ogori", "ogose", "ogoso", "ogoto", "okoba", "okobata", "osa", "osakabe", "ozaki", "ozaku", "osashima", "osatsu", "osatsunai", "osafune", "osamunai", "ozawa", "oshiage", "oshioe", "ojikakogen", "oshikado", "oshikiri", "oshino", "oshibedani", "oshima", "oshimaono", "oshimasawara", "oshimatsuruoka", "oshimatobetsu", "oshimanumajiri", "ojimaya", "oshimi", "oshamambe", "oshironai", "ozekiyama", "osokinai", "oda", "otai", "odai", "odaibakaihinkoen", "odaka", "odakyusagamihara", "odakyutamasenta", "odakyunagayama", "otanoshike", "odabayashi", "odabuchi", "otaru", "otaruchikko", "odawara", "ochiai", "ochiaigawa", "ochiaiminaminagasaki", "ochi", "ochishi", "ojiya", "ochanomizu", "okkawa", "ozuki", "ottomo", "oppama", "otoineppu", "otobashi", "otogawa", "otokoyamasanjo", "otozawa", "otoshibe", "otomaru", "otome", "otomo", "odoriba", "otowacho", "ona", "onagawa", "onarimon", "onigase", "onigoe", "onizuka", "onuka", "ono", "onoesogokokomae", "onoenomatsu", "onogami", "onogamionsen", "onoda", "onodako", "onoppunai", "ononimachi", "onobori", "onohommachi", "onomachi", "onomichi", "onoya", "obasute", "obasenishikodaimae", "obata", "obataryokuchi", "ohanajiゃya", "ohanabatake", "obama", "obayashi", "obara", "obi", "obiori", "obitsu", "obitoke", "obihiro", "ofuku", "obusuma", "obuse", "oboro", "omaeda", "omata", "omatsu", "omigawa", "omurai", "omuro", "omoigawa", "omokagebashi", "omoshiroyamakogen", "omochanomachi", "omotesando", "omoto", "omori", "oyashirazu", "oyana", "oyanagi", "oyahana", "oyama", "oyamada", "oyamadai", "oyumino", "oyochi", "ori", "orio", "orikasa", "orikabe", "origuchi", "oritate", "oritateguchi", "orihata", "orihara", "oribe", "orimoto", "oryuzako", "oriwatari", "orenjitaun", "oroshimachi", "owase", "owada", "owariasahi", "owarichinomiya", "owariseto", "owarihoshinomiya", "owarimorioka", "owariyokosuka", "ongagawa", "ongano", "onjuku", "onda", "ontakesan", "onji", "onnenai", "ombara", "ombetsu", "garayuzawa", "kaiwama", "kaiueno", "gaiemmae", "kaiomaru", "kaioizumi", "kaioshima", "kaiganji", "kaigandori", "kaikoizumi", "kaikonoyashiro", "kaizaki", "kaiji", "kaijin", "kaisumiyoshi", "kaize", "kaisei", "kaida", "kaitaichi", "kaizuka", "kaizukashiyakushomae", "kaitokiwa", "kaina", "kainan", "kaibara", "kaihimmakuhari", "kaifu", "kaihotsu", "kaimei", "kaimon", "kaiyamato", "kaesa", "kaede", "kagaichinomiya", "kagaonsen", "kagakasama", "kagatsume", "kagato", "kagami", "kagamishi", "kagamigahara", "kagamigaharahikojo", "kagamigawabashi", "kakarima", "kagawa", "kakio", "kakigashima", "kakizaki", "kakishitaonsenguchi", "kakidaira", "kakinoki", "kaku", "gaku", "gakuendori", "gakuentoshi", "gakuemmae", "kakuozan", "gakugeidaigaku", "kagusa", "gakushuinshita", "kakuda", "gakuden", "gakunaneno", "gakunanharada", "gakunanfujioka", "kakunodate", "kakumodani", "gakumon", "kaguyama", "kaguraoka", "kagurazaka", "kake", "kakegawa", "kakegawashiyakushomae", "kagetsuemmae", "kageno", "kagemachi", "kagemori", "kakeyama", "kako", "kakogawa", "kagoshima", "kagoshimaekimae", "kagohara", "kasai", "kasairinkaikoen", "kasaoka", "kasagamikurohae", "kasagi", "kazashigaoka", "kasashiho", "kasashima", "kasadera", "kasado", "kasanui", "kasahata", "kazahaya", "kasama", "kasamatsu", "kazamatsuri", "kaji", "kashi", "kashikaemmae", "kashijingu", "kashimiyamae", "kajikazawaguchi", "kajigaya", "kajiki", "kashikojima", "kajita", "kashiharajingunishiguchi", "kashiharajingumae", "kashima", "kashimasahi", "kashimaono", "kashimasakkasutajiamu", "kashimajingu", "kashimada", "kashimadai", "kashimanada", "kajiyashiki", "kashiyama", "kajiyamachi", "kashiwa", "kashiwagidaira", "kashiwagicho", "kashiwazaki", "kashiwadai", "kashiwabara", "kashiwamori", "kashiwara", "kajiwara", "kashiwaraminamiguchi", "kasuga", "kasugai", "kasugaicho", "kasugagawa", "kasugacho", "kasuganomichi", "kasugabaru", "kasukabe", "kasugayama", "kasukawa", "kazusazuma", "kazusaichinomiya", "kazusaushiku", "kazusaokubo", "kazusaokitsu", "kazusakameyama", "kazusakawama", "kazusakiyokawa", "kazusakubo", "kazusatsurumai", "kazusanakagawa", "kazusanakano", "kazusamatsuoka", "kazusamitsumata", "kazusaminato", "kazusamurakami", "kazusayamada", "kasubuchi", "kasumi", "kasumigaura", "kasumigaoka", "kasumigaseki", "kasumori", "kazurashimahigashizume", "kase", "kasei", "kaseda", "kazo", "kasose", "kata", "kada", "kataoka", "katakai", "katakura", "katakuracho", "katashimo", "katasenoshima", "kataseshirata", "kataseyama", "katata", "katano", "katanoshi", "katahama", "katahara", "kataharamachi", "katabiranotsuji", "katamachi", "katamoto", "kachigawa", "kachidoki", "katsura", "gatsugi", "gakkomae", "kazusa", "kassemba", "katsuta", "katsutadai", "katsunumabudokyo", "katsuno", "kazunohanawa", "katsuma", "kazuma", "katsumada", "katsuyama", "katsuyamacho", "katsura", "katsuraoka", "katsuragawa", "katsurase", "katsuradai", "katsurane", "kateisaibanshomae", "kato", "kado", "kadogawa", "kadosawabashi", "kadoshima", "kadotayashiki", "kadonohama", "kadohara", "kadomashi", "kadomatsu", "kadomaminami", "katori", "kanaishihara", "kanaiyama", "kanae", "kanagawa", "kanagawashimmachi", "kanagi", "kanasashi", "kanazawa", "kanazawahakkei", "kanazawabunko", "kanashima", "kanazonochokyuchome", "kanazonochoyonchome", "kanada", "kanatake", "kanazuka", "kanahashi", "kanamachi", "kanami", "kanameta", "kanamecho", "kanaya", "kanayagawa", "kanayaguchi", "kanayasawa", "kanayama", "kanayamacho", "kani", "kanie", "kanigawa", "kanita", "kanuma", "kaneage", "kanegasaki", "kanegafuchi", "kaneko", "kaneshima", "kanetsuri", "kanehana", "kanehama", "kanemaru", "kanente", "kano", "kanose", "kanohara", "kanomata", "kabaike", "kabatake", "kabuto", "kabutonuma", "kafuri", "kabe", "kamaishi", "kamaga", "kamagafuchi", "kamagaya", "kamagayadaibutsu", "kamakura", "kamakurakokomae", "gamagori", "gamagorikyoteijomae", "kamasusaka", "kamase", "kamata", "kamachi", "kamate", "kamado", "kamatori", "kamanohana", "kamabuchi", "kamaya", "kamayama", "kami", "kamiainora", "kamiakutami", "kamiashibetsu", "kamiaso", "kamiatsunai", "kamiarisu", "kamiarita", "kamiijima", "kamiida", "kamigusa", "kamijuin", "kamizumi", "kamiso", "kamita", "kamitabashi", "kamichi", "kamichiba", "kamichiman", "kamimai", "kamimaichi", "kamimari", "kamiwami", "kamiusuki", "kamiura", "kamiuwa", "kamio", "kamioi", "kamiooka", "kamiotsuki", "kamioka", "kamiokaohashi", "kamiokakozammae", "kamiogawa", "kamiotai", "kamioboro", "kamikagawa", "kamikasada", "kamikatagiri", "kamikatsura", "kamikanada", "kamikawa", "kamikawaguchi", "kamikawatachi", "kamikambai", "kamikitazawa", "kamikitadai", "kamikitacho", "kamikumagaya", "kamikumamoto", "kamikumamotoekimae", "kamikuwanagawa", "kamigo", "kamigora", "kamigori", "kamikosawa", "kamikoma", "kamisakai", "kamisakaemachi", "kamizaki", "kamisaza", "kamisabae", "kamisawa", "kamishioya", "kamishishiori", "kamishakuji", "kamijo", "kamishirataki", "kamishiro", "kamishinjo", "kamizue", "kamisugaya", "kamisugi", "kamisuge", "kamisuwa", "kamisendai", "kamidaki", "kamitanora", "kamitokoro", "kamitoshibetsu", "kamitode", "kamitono", "kamitobaguchi", "kamitoyota", "kaminaka", "kaminakazato", "kaminagatoro", "kaminagaya", "kaminoki", "kaminokuni", "kaminoge", "kaminogo", "kaminosho", "kaminojiri", "kaminotaishi", "kaminocho", "kaminopporo", "kaminobe", "kaminoma", "kaminome", "kaminoyamaonsen", "kamihama", "kamihinokinai", "kamifukawa", "kamifukuoka", "kamifutada", "kamifurano", "kamihoshikawa", "kamihonami", "kamihobara", "kamihori", "kamihoronobe", "kamihoromui", "kamihongo", "kamihommachi", "kamimaezu", "kamimachi", "kamimachitchome", "kamimachigochome", "kamimachinichome", "kamimachiyonchome", "kamimatsukawa", "kamimarubuchi", "kamimamba", "kamimio", "kamimizo", "kamimita", "kamimiyorishiobara", "kamimoku", "kamimorioka", "kamimoroe", "kamiya", "kamiyagi", "kamiyakuno", "kamiyashiro", "kamiyasu", "kamiyacho", "kamiyachonishi", "kamiyachohigashi", "kamiyama", "kamiyamaguchi", "kamiyuzawa", "kamiyokosuka", "kamiyonai", "kamiwakuya", "kamuriki", "kamuro", "kameari", "kamei", "kameido", "kameidosuijin", "kameoka", "kamegasaki", "kamegawa", "kamezaki", "kamejima", "kameda", "kamedake", "kamenoko", "kameyama", "kamo", "kamoi", "kamoike", "gamo", "gamoyonchome", "kamogata", "kamogawa", "kamogo", "kamojima", "kamonaka", "kamono", "kamonomiya", "kamobe", "kayakusa", "kayashima", "kayanuma", "kayabacho", "kayama", "kayamachi", "kayamachirokuchome", "karakasa", "karakawa", "karakida", "karasaki", "karashimacho", "karasue", "karasuma", "karasumaoike", "karasuyama", "karatsu", "karatodai", "karahashimae", "kariu", "karikawa"]


function random_station() {
    return stations[Math.floor(Math.random() * stations.length)];
}

function zero_add(num) {

    if (num < 10)return "0000" + num;
    else if (num < 100)return "000" + num;
    else if (num < 1000)return "00" + num;
    else if (num < 10000)return "0" + num;
    else return "" + num;

}

function shuffle(array) {
    //shuffles the array
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}

function log_in() {
    var email = $("#e-mail").val();
    var password = $("#password").val();
    console.log(email);
    $.post("",
        {

            email: email,
            password: password,
            csrfmiddlewaretoken: csrf_token

        },
        function (data, status) {
            console.log('logged in');
            location.reload(true);
        })

        .fail(function (xhr) {
            console.log("Error: " + xhr.statusText);
            alert("Error: " + xhr.statusText);
        });
    return false;
}