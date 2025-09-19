import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Documentación Técnica Completa",
    Svg: require("@site/static/img/Assets/BackLogo.svg").default,
    description: (
      <>
        Documentación exhaustiva de arquitectura, APIs, instalación y
        configuración de nuestros productos: <strong>GcRisk</strong>,{" "}
        <strong>GCBloomRisk</strong>,<strong>GCM</strong> y{" "}
        <strong>GCMutual</strong>. Incluye guías de desarrollo, despliegue y
        mantenimiento para equipos técnicos.
      </>
    ),
  },
  {
    title: "Guías de Diseño y UX/UI",
    Svg: require("@site/static/img/Assets/FrontLogo.svg").default,
    description: (
      <>
        Especificaciones de diseño, patrones de interfaz, guías de estilo y
        componentes reutilizables. Documentación completa del sistema de diseño
        corporativo, paletas de colores, tipografías y elementos visuales que
        definen la identidad de Garantías Comunitarias.
      </>
    ),
  },
  {
    title: "Fundamentos Teóricos y Algoritmos",
    Svg: require("@site/static/img/Assets/TeoriaLogo.svg").default,
    description: (
      <>
        Explicación detallada de los modelos matemáticos, algoritmos de cálculo
        de riesgos, metodologías de evaluación financiera y justificaciones
        teóricas de cada módulo. Incluye integraciones con sistemas externos y
        estándares regulatorios.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
