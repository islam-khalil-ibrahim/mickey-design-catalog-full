import { useMemo, useState } from "react";
import Barcode from "react-barcode";
import {
  ArrowRight, ArrowLeft, Search, X, ChevronLeft,
  Coffee, Shirt, Tag, ShoppingBasket, BriefcaseBusiness,
  PanelsTopLeft, Box, FileText, Utensils, Sparkles, Package,
  Menu, Phone, Instagram
} from "lucide-react";
import { categories, getProducts, iconNames } from "./data";

const orange = "#F58220";

const iconMap = {
  cup: Coffee,
  shirt: Shirt,
  tag: Tag,
  bag: ShoppingBasket,
  briefcase: BriefcaseBusiness,
  panels: PanelsTopLeft,
  box: Box,
  file: FileText,
  utensils: Utensils,
  sparkles: Sparkles
};

function CategoryIcon({ category, size = 28 }) {
  const Icon = iconMap[iconNames[category]] || Package;
  return <Icon size={size} strokeWidth={1.7} />;
}

function MockImage({ category, index = 0, large = false }) {
  const backgrounds = ["#FFF0E4", "#EAF7FF", "#F2F0FF", "#EAF8F4"];
  return (
    <div
      className={`relative flex overflow-hidden rounded-[24px] items-center justify-center ${large ? "min-h-[420px]" : "h-52"}`}
      style={{ background: backgrounds[index % backgrounds.length] }}
    >
      <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-white/60" />
      <div className="absolute -bottom-20 -right-12 h-48 w-48 rounded-full bg-black/[0.035]" />
      <div className={`${large ? "h-48 w-48" : "h-28 w-28"} relative flex items-center justify-center rounded-[32px] bg-white shadow-[0_20px_50px_rgba(0,0,0,.09)]`}>
        <CategoryIcon category={category} size={large ? 86 : 55} />
      </div>
      <span className="absolute bottom-3 right-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold text-neutral-400 backdrop-blur">
        صورة مؤقتة
      </span>
    </div>
  );
}

function ProductCard({ product, category, onOpen }) {
  return (
    <article className="group rounded-[28px] border border-[#E9E2DA] bg-white p-3 shadow-[0_8px_35px_rgba(25,20,15,.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(25,20,15,.10)]">
      <MockImage category={category} index={product.index} />
      <div className="px-2 pb-2 pt-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-lg font-black leading-7">{product.name}</h3>
          <span className="rounded-full bg-[#FFF2E8] px-2.5 py-1 text-[10px] font-bold text-[#D96808]">
            مخصص
          </span>
        </div>
        <p className="mb-4 text-xs leading-6 text-neutral-500">
          طباعة احترافية • خيارات متعددة • تجهيز حسب الطلب
        </p>
        <div className="flex items-center justify-between border-t border-[#EEE8E1] pt-3">
          <div>
            <p className="text-[10px] font-semibold text-neutral-400">SKU</p>
            <p className="font-mono text-xs font-bold text-neutral-700">{product.sku}</p>
          </div>
          <button
            onClick={() => onOpen(product)}
            className="rounded-full bg-[#171717] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#F58220]"
          >
            التفاصيل
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductModal({ product, category, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm md:items-center md:p-6">
      <div className="max-h-[94vh] w-full max-w-5xl overflow-auto rounded-t-[34px] bg-white md:rounded-[34px]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EEE8E1] bg-white/95 px-6 py-4 backdrop-blur">
          <div>
            <p className="text-xs font-black text-[#F58220]">{category}</p>
            <h2 className="text-xl font-black">{product.name}</h2>
          </div>
          <button onClick={onClose} className="rounded-full bg-neutral-100 p-2 hover:bg-neutral-200">
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-8 p-6 md:grid-cols-[1.05fr_.95fr] md:p-9">
          <MockImage category={category} index={product.index} large />

          <div>
            <span className="inline-flex rounded-full bg-[#EAF8F4] px-3 py-1 text-xs font-bold text-emerald-700">
              متوفر حسب الطلب
            </span>

            <h3 className="mt-4 text-3xl font-black leading-tight">{product.name}</h3>

            <p className="mt-3 leading-8 text-neutral-600">
              {product.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ["الخامة", product.material],
                ["الطباعة", product.printing],
                ["الحد الأدنى", product.minQuantity],
                ["التجهيز", "حسب الطلب"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-[#F8F6F1] p-4">
                  <p className="text-xs text-neutral-400">{label}</p>
                  <p className="mt-1 text-sm font-bold">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-3xl border border-[#E9E2DA] p-5">
              <p className="mb-3 text-xs font-bold text-neutral-500">
                BARCODE / PRODUCT SKU
              </p>

              <div className="flex justify-center overflow-hidden">
                <Barcode
                  value={product.sku}
                  format="CODE128"
                  displayValue
                  height={58}
                  width={1.7}
                  margin={0}
                  fontSize={13}
                />
              </div>

              <p className="mt-2 text-center font-mono text-sm font-black">
                {product.sku}
              </p>
            </div>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F58220] py-4 text-sm font-black text-white shadow-lg shadow-orange-200 transition hover:bg-[#D96808]">
              اطلب هذا المنتج
              <ArrowLeft size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ onHome, onProducts }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E9E2DA]/80 bg-[#F8F6F1]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <button onClick={onHome} className="flex items-center gap-3 text-right">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#171717] text-xl font-black text-white">
            M
          </div>
          <div>
            <div className="text-lg font-black leading-none">
              Mickey <span className="text-[#F58220]">Design</span>
            </div>
            <div className="mt-1 text-[10px] font-bold text-neutral-400">
              DESIGN • PRINT • BRAND
            </div>
          </div>
        </button>

        <nav className="hidden items-center gap-7 text-sm font-bold text-neutral-600 md:flex">
          <button onClick={onHome} className="hover:text-[#F58220]">الرئيسية</button>
          <button onClick={onProducts} className="hover:text-[#F58220]">المنتجات</button>
          <button className="hover:text-[#F58220]">خدماتنا</button>
          <button className="hover:text-[#F58220]">تواصل معنا</button>
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-full bg-[#F58220] px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-orange-200 sm:block">
            اطلب تصميمك
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-full border border-[#E9E2DA] bg-white p-2.5 md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#E9E2DA] bg-white p-4 md:hidden">
          <div className="grid gap-2 text-sm font-bold">
            <button onClick={onHome} className="rounded-xl p-3 text-right hover:bg-[#F8F6F1]">الرئيسية</button>
            <button onClick={onProducts} className="rounded-xl p-3 text-right hover:bg-[#F8F6F1]">المنتجات</button>
            <button className="rounded-xl p-3 text-right hover:bg-[#F8F6F1]">خدماتنا</button>
            <button className="rounded-xl p-3 text-right hover:bg-[#F8F6F1]">تواصل معنا</button>
          </div>
        </div>
      )}
    </header>
  );
}

function Home({ onCategory, search, setSearch }) {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-10 pt-12 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:pt-16">
        <div className="flex flex-col justify-center">
          <span className="mb-4 w-fit rounded-full border border-[#F58220]/25 bg-[#FFF0E4] px-4 py-2 text-xs font-black text-[#D96808]">
            PRODUCT CATALOG • 2026
          </span>

          <h1 className="max-w-3xl text-4xl font-black leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl">
            كل منتجاتك المطبوعة،
            <br />
            <span className="text-[#F58220]">بشكل أوضح وأجمل.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-neutral-500">
            تصفحي الأقسام، اختاري نوع المنتج، ثم افتحي بطاقة المنتج لتشوفي
            المواصفات والـ SKU والباركود في مكان واحد.
          </p>

          <div className="mt-7 flex max-w-xl items-center gap-2 rounded-2xl border border-[#E9E2DA] bg-white p-2 shadow-sm">
            <Search className="mr-2 text-neutral-400" size={20} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحثي عن كاسات، بوكسات، أكياس..."
              className="w-full bg-transparent px-2 py-3 text-sm outline-none"
            />
            <button className="rounded-xl bg-[#171717] px-5 py-3 text-xs font-bold text-white">
              بحث
            </button>
          </div>
        </div>

        <div className="relative min-h-[350px] overflow-hidden rounded-[34px] bg-[#F58220] p-7 shadow-[0_25px_70px_rgba(245,130,32,.24)]">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/20" />
          <div className="absolute -bottom-28 -left-12 h-80 w-80 rounded-full bg-black/10" />

          <div className="relative flex h-full flex-col justify-between">
            <div className="text-white">
              <p className="text-sm font-bold opacity-80">Mickey Design</p>
              <p className="mt-2 max-w-sm text-3xl font-black leading-tight">
                من الفكرة… إلى منتج جاهز يحمل هويتك.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {["كاسات", "بوكسات", "أكياس"].map((name) => (
                <button
                  key={name}
                  onClick={() => onCategory(categories.find((c) => c.name === (name === "بوكسات" ? "مستلزمات تغليف" : name)))}
                  className="rounded-3xl border border-white/25 bg-white/15 p-4 text-right backdrop-blur transition hover:bg-white/25"
                >
                  <Package className="mb-7 text-white" size={30} />
                  <p className="font-black text-white">{name}</p>
                  <p className="mt-1 text-[10px] text-white/70">استكشف</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-xs font-black text-[#F58220]">PRODUCT CATEGORIES</p>
            <h2 className="mt-1 text-3xl font-black">استكشفي الأقسام</h2>
          </div>
          <span className="text-xs font-bold text-neutral-400">
            {categories.length} أقسام • {categories.reduce((sum, c) => sum + c.subcategories.length, 0)} فرع
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategory(category)}
              className="group relative min-h-[190px] overflow-hidden rounded-[28px] border border-[#E9E2DA] bg-white p-5 text-right transition duration-300 hover:-translate-y-1 hover:border-[#F58220]/30 hover:shadow-[0_18px_45px_rgba(25,20,15,.09)]"
            >
              <div
                className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl text-[#F58220]"
                style={{ background: category.accent }}
              >
                <CategoryIcon category={category.name} size={24} />
              </div>

              <h3 className="text-lg font-black">{category.name}</h3>

              <div className="mt-1 flex items-center justify-between text-xs text-neutral-400">
                <span>{category.subcategories.length} فروع</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F8F6F1] transition group-hover:bg-[#F58220] group-hover:text-white">
                  <ChevronLeft size={15} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function CategoryPage({ category, onBack, onSubcategory }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-[#F58220]">
        <ArrowRight size={16} />
        كل الأقسام
      </button>

      <div className="rounded-[34px] bg-[#171717] p-7 text-white md:p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-black text-[#F58220]">CATEGORY</p>
            <h1 className="mt-2 text-4xl font-black">{category.name}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
              اختاري نوع المنتج من الفروع التالية، وبعدها ستظهر لك المنتجات
              ببطاقات موحدة مع كود المنتج والباركود.
            </p>
          </div>
          <div className="hidden h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-[#F58220] sm:flex">
            <CategoryIcon category={category.name} size={34} />
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {category.subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => onSubcategory(sub)}
              className="rounded-full bg-white/10 px-4 py-2.5 text-xs font-bold text-white/75 transition hover:bg-[#F58220] hover:text-white"
            >
              {sub.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {category.subcategories.map((sub, index) => (
          <button
            key={sub.id}
            onClick={() => onSubcategory(sub)}
            className="group overflow-hidden rounded-[26px] border border-[#E9E2DA] bg-white p-4 text-right transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              className="flex h-36 items-center justify-center rounded-[20px] text-[#F58220]"
              style={{ background: category.accent }}
            >
              <CategoryIcon category={category.name} size={index % 2 ? 48 : 54} />
            </div>

            <div className="flex items-center justify-between gap-2 px-1 pt-4">
              <h3 className="font-black">{sub.name}</h3>
              <ChevronLeft size={18} className="text-neutral-300 transition group-hover:text-[#F58220]" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProductsPage({ category, subcategory, onBack, onProduct }) {
  const [search, setSearch] = useState("");
  const products = getProducts(subcategory.name);

  const filtered = useMemo(
    () => products.filter((p) => p.name.includes(search.trim()) || !search.trim()),
    [products, search]
  );

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-[#F58220]">
        <ArrowRight size={16} />
        {category.name}
      </button>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-black text-[#F58220]">PRODUCTS</p>
          <h1 className="mt-1 text-3xl font-black">{subcategory.name}</h1>
          <p className="mt-2 text-sm text-neutral-500">
            {products.length} منتجات تجريبية — استبدلي الصور والبيانات من الـ Backend لاحقًا.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-[#E9E2DA] bg-white px-3 py-2">
          <Search size={18} className="text-neutral-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحثي داخل المنتجات..."
            className="bg-transparent px-2 py-2 text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            category={category.name}
            onOpen={onProduct}
          />
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-[#E9E2DA] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-9 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-black">Mickey <span className="text-[#F58220]">Design</span></p>
          <p className="mt-1 text-xs text-neutral-400">Design • Print • Brand</p>
        </div>
        <div className="flex gap-4 text-neutral-400">
          <button className="hover:text-[#F58220]"><Phone size={18}/></button>
          <button className="hover:text-[#F58220]"><Instagram size={18}/></button>
        </div>
        <p className="text-xs text-neutral-400">© 2026 Mickey Design</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [product, setProduct] = useState(null);
  const [search, setSearch] = useState("");

  const home = () => {
    setPage("home");
    setCategory(null);
    setSubcategory(null);
    setProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showCategory = (selected) => {
    if (!selected) return;
    setCategory(selected);
    setSubcategory(null);
    setProduct(null);
    setPage("category");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showSubcategory = (selected) => {
    setSubcategory(selected);
    setProduct(null);
    setPage("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8F6F1]">
      <div className="bg-[#171717] px-5 py-2 text-center text-xs font-bold text-white">
        اطلب تصميمك المجاني الآن
        <span className="mx-2 text-[#F58220]">•</span>
        طباعة وتجهيز حسب احتياجك
      </div>

      <Header onHome={home} onProducts={() => {
        setPage("home");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }} />

      {page === "home" && (
        <Home
          onCategory={showCategory}
          search={search}
          setSearch={setSearch}
        />
      )}

      {page === "category" && category && (
        <CategoryPage
          category={category}
          onBack={home}
          onSubcategory={showSubcategory}
        />
      )}

      {page === "products" && category && subcategory && (
        <ProductsPage
          category={category}
          subcategory={subcategory}
          onBack={() => showCategory(category)}
          onProduct={setProduct}
        />
      )}

      <Footer />

      <ProductModal
        product={product}
        category={category?.name}
        onClose={() => setProduct(null)}
      />
    </div>
  );
}