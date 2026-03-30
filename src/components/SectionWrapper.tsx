import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
}

const SectionWrapper = ({ id, children, className = "" }: Props) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
    className={`py-28 px-6 ${className}`}
  >
    <div className="container mx-auto max-w-5xl">{children}</div>
  </motion.section>
);

export default SectionWrapper;
