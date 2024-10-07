import img_rent from "../assets/img/rent.png";
const Rent = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="w-full object-cover md:w-48 mt-16 rounded-xl mr-2"
            src={img_rent}
            alt="Project Goal"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-lg text-indigo-500 font-extrabold text-center">
          كيفية استئجار مساحة الإعلان
          </div>
          <p className="mt-2 text-slate-500 text-justify">
            <a
              href="#"
              className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
              حال رغبتكم في استئجار مساحةٍ لعرض إعلانكم الخاص، وبعد اطلاعكم على خانة الشروط على صفحة الموقع وإقراركم بها، اتبعوا الخطوات الآتية:
            </a>      
          </p>
          <ol className="list-decimal">
            <li className="mt-2 text-slate-500 text-justify">
            حدد الموقع الذي تفضله على شبكة البدائل عبر تحديد المربعات التي تود استئجارها مِساحةً خاصةً لعرض منتجك المحلّي.
            </li>
            <li className="mt-2 text-slate-500 text-justify">
            أضف الصورة التي تودّ عرضها لتمثّل منتجك المحلّي على هذه الشبكة التجارية:
            </li>
            <li className="mt-2 text-slate-500 text-justify">
            قم بإضافة رابط الصفحة التي تود أن ينتقل لها زائر الموقع لحظة ضغطه فوق صورة إعلانكم (الموقع الرئيسي لمنتجك):
            </li>
            <li className="mt-2 text-slate-500 text-justify">
            اكتب اسم شركتك/ منتجك المحلّي:
            </li>
            <li className="mt-2 text-slate-500 text-justify">
            سمِّ بلد منتجك المحلّي:
            </li>
            <li className="mt-2 text-slate-500 text-justify">
            ادخل رقم الهاتف بالإضافة إلى الإيميل الذي تودّ منا التواصل مع شركتكم من خلاله لإتمام عملية الدفع، ثم إضافة إعلانكم، وإرسال فاتورةٍ بما تم دفعه مقابل ما تم الاتفاق على عَرضه على هذه الشبكة التجارية للمنتجات المحلية:   الإيميل:		رقم الهاتف:
            </li>
            <li className="mt-2 text-slate-500 text-justify">
            اكتب فقرةً صغيرةً تحتوي على نبذة تعريفية بمنتجك المحلّي، تشرح فيها عن ماهيته وما يميزه، ليتم عرضها لدى الضغط على صورة منتجكم (ميزة لفترة زمنية مؤقتة):
            </li>
          </ol>          
        </div>
      </div>
    </div>
  );
};
export default Rent;
