import img_idea from "../assets/img/idea.png";
const Idea = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="w-full object-cover md:h-48 mt-9"
            src={img_idea}
            alt="Project Goal"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-lg text-indigo-500 font-extrabold text-center">
            فكرة المشروع
          </div>
          <p className="mt-2 text-slate-500 text-justify">
            <p className="inline-block mt-1 text-lg leading-tight font-medium text-black">
              دعماً لفكرة المقاطعة، ورغبةً منا بالبناء عليها؛ إذ تتوفر لدينا
              العديد من المواقع التي توضح لأي مشترٍ عربيٍّ ما إذا كان منتجٌ ما
              مقاطعاً أم لا؛ فكانت الحاجة إلى شبكةٍ تقدّم له المنتجات المحلّية
              بالمقابل، فيسهل عثوره عليها، كأنه يتجوّل في "مول" إلكتروني كل ما
              فيه بضائع ومنتجات من إنتاج شعبه العربيّ، شبكةٌ تمثل نواةً آمنة
              تحميه من التّبعية، وتحمي اقتصاد بلادنا من الأزمات الدولية؛ ومن هنا
              جاءت فكرة المشروع إذ صار لزاماً وجود موقعٍ يعرض البديل المحلّي،
              ليُكمل ما بدأته المواقع التي توضح ما إن كان منتجٌ ما مقاطعاً أم
              لا؛ وهي شبكة متجددة، إذ يمكن دوماً تأجير مساحاتها لصالح منتجات
              محلية جديدة بعد تمام الفترة التي تم استئجارها مسبقاً، أو تجديد
              استئجار المِساحة لدى أي منتج محليٍّ على الشبكة.
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Idea;
