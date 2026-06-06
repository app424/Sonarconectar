import { motion } from "framer-motion";

const DRIVE_IDS = [
  "1MJHLNYjxMSBL11LvcFb1M7g6LbZq1AMt",
  "1jLvWQ68xKrAKvucLUtXBH0vySwl-AEAG",
  "1jsY15XQ_FRKnLWNAi7W0d2A7iYyNjWqv",
  "1ci7STh_HIssh8XOB3AeKFIii-QAhO_Sd",
  "1dQZjBPcNIEhz-lo6Q6XQd9yDLephDnRS",
  "17MAigCKzV5b66xwmN-rdRdxvHIhb7LTL",
  "1GZqC61cjoK5QD5AAH_1aCkF3SZWcAnEi",
  "1sIzAu9ZFAxGn095VY31uoaUm2sPr-lzS",
  "1PcFLvDxw8u9oUl_PRF4d0ZP7SATCyGVB",
  "14kKfn3vRzjawj9JrhNWVB9Ag9UwJyJqq",
  "1bMeRrDeqOQfStExQADuMSrCZ9kOqRO4W",
  "1kKZYWqJrfpxByFuAuj2MSCV1g64EvEpC",
  "1R-PEUTHfaJqfPiDt3jnbb0Img7fs28oy",
  "1CHvy9yfOEnWNdCpWLarXHILN4HEX54lt",
  "1n6LyBWMpik5Bk7_hnJGoY8M2Rf4ZnwyC",
  "1h7Xvm_auigBg77CuUtxiIhWORf6CVkAu",
  "1xAnsljelUvmlxnLr2w9AJn144mncxibN",
  "1ptD8gyms52BxX3Ch5W0m_uzQkUPFcSbX",
  "1AUiX-or1DuIB4UAJxw9w8AyMhoiRURwT",
  "1U2saemSKE5f4HyVH58qKBT-hl6APUiMB",
  "1jnJzwP91i2Kah_3wSrfajZDXsID1A0Z0",
  "1Ju6sglY4tqImEU3AM2wUnqQ43kgEaFbJ",
  "1J1iLU957suWfZOtRUWV6y4Axn3uBsT0Y",
  "1UTVGaX0wZsNKVe5HkpqBtjgdiLQv1UPd",
  "1FhWciUQHqSW3nweKzkM7CMOO236a4Whb",
  "1OED_Mnv8pWtElFD6tdlrv9emk7rYgcBp",
  "1cNvl_TbKcavaB-XeNNuDzQJlNlhSdgGQ",
  "1qDG0Aklviwr-0gnSb-L7euGV6PlguN-7",
  "1cmO2X-lo1M-dJD6LlY_EJKjJNfw06UFq",
  "1_Ya-bYLaK52XOIyUcGHxqZQDBkplXsEr",
  "1PEivt8mB1EWqF4c9xPR8DBjkxLUBAb_j",
  "1P_8EXYCLnAJP0s7TKzvmPRWa6nrBDj_S",
  "1lZvlMk5hGR7fqjRBqCCOhNDWzQphhU1q",
  "19NCGu3MHxOdBFP47L2j0giqXXwUDuTau",
  "10FiU1XYVSIMrFbDEV-Rj7SicQOSKbqgY",
  "1idcv6iYckMBZx_iG8Xap1znMtMUxv8AS",
  "1IorZyndiWIYODdRERg5b8euLZC32F219",
];

const logoUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}=w400`;

const ALL_LOGOS = DRIVE_IDS.map(logoUrl);

const ClientLogosSection = () => {
  return (
    <section id="clients" className="bg-white text-black py-24 md:py-32 border-t border-black/10">
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="mf-eyebrow mb-6 flex items-center gap-3 !text-gold">
            <span className="w-8 h-px bg-gold" /> Clients
          </p>
          <h2 className="mf-title text-black text-4xl md:text-6xl lg:text-7xl max-w-4xl">
            150+ brands <span className="text-gold italic font-medium" style={{ fontFamily: '"Archivo Narrow", sans-serif' }}>trust us.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8 md:gap-x-10 md:gap-y-12 items-center"
        >
          {ALL_LOGOS.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 12) * 0.04 }}
              className="flex items-center justify-center p-3 bg-white rounded-md h-28 md:h-36 transition-transform duration-300 hover:scale-105 hover:shadow-[0_8px_24px_-8px_rgba(201,168,76,0.35)]"
            >
              <img
                src={src}
                alt="Client logo"
                loading="lazy"
                draggable={false}
                onContextMenu={(ev) => ev.preventDefault()}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain select-none pointer-events-none"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
