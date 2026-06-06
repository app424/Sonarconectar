import { AnimatePresence, motion } from "framer-motion";
import sonarLogo from "@/assets/sonar-logo.png";

const NavLoader = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed inset-0 z-[100] bg-dark flex items-center justify-center"
      >
        <motion.img
          src={sonarLogo}
          alt="Sonar Conectar"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="w-40 md:w-56 select-none pointer-events-none drop-shadow-[0_0_40px_rgba(201,168,76,0.35)]"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute bottom-1/3 h-px bg-gold/70"
        />
      </motion.div>
    )}
  </AnimatePresence>
);

export default NavLoader;
