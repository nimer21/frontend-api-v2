import img_features from "../assets/img/features.png";
const Dashboard = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="w-full object-cover md:w-48 mt-16 rounded-xl mr-2"
            src={img_features}
            alt="Project Goal"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-lg text-indigo-500 font-extrabold text-center">
          المزايا
          </div>
          <p className="mt-2 text-slate-500 text-justify">
            <a
              href="#"
              className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
              عروض مقدمة لمن يستأجر مساحته الخاصة للإعلان من أصحاب المشاريع المحلّية قبل نهاية العام 2024 للميلاد:
            </a>      
          </p>
          <ol className="list-decimal">
            <li className="mt-2 text-slate-500 text-justify">
            ميزة مادية: تباع خلية الإعلان الواحدة في فضاء المنتجات المحلية ب: 140 دينار أردني، لكل شركة محلية تقوم باستئجار مساحة إعلان ضمن هذا الفضاء قبل نهاية العام 2024م، لتعود بعد ذلك لسعر: 150 دينار أردني مقابل الخلية الإعلانية الواحدة.
            </li>
            <li className="mt-2 text-slate-500 text-justify">
            ميزة مادية ثانية: كل شركة محلية تقوم بحجز: 90 خلية (أيْ ما يقدّر ثمنه ب: 12.600 دينار أردني)، تحصل على خصم إضافيّ لسعر المساحة الإعلانية، فتستأجر الشركة المحلية مساحة "90 خلية إعلانية" بقيمة: 10.800 دينار أردني، إذ تُحسب قيمة الخلية الواحدة (120 دينار أردني) في هذه الحالة.
            </li>
            <li className="mt-2 text-slate-500 text-justify">
            ميزة زمنية: الشركات التي تسارع بحجز "مساحة إعلانها" قبل نهاية العام 2024م، سيضاف لإعلانها على الشبكة ميزة عرض صورة الإعلان بحجم كبير على الشاشة لدى الضغط عليها، وبالتالي يصبح الإعلان أوضح، ولافتاً أكثر لزائر الموقع الباحث عن البديل الأنسب في شبكة البدائل الواسعة هذه.
            </li>
            <li className="mt-2 text-slate-500 text-justify">
            ميزة زمنية ثانية: الشركات التي تسارع بحجز "مساحة إعلان" قبل نهاية العام 2024م سيضاف لإعلانها على الشبكة التجارية ميزة إضافة فقرة تحتوي على نبذة تعرّف زائر الموقع بالمشروع المحلّيّ وتشرح أهمّ ما يميّزه عن غيره ويجعله مُستحقّاً لأن يكون الخيار الأول لكلّ مشترٍ عربيّ.
            </li>
          </ol>          
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
