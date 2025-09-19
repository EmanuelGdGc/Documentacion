import type { ReactNode } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Garantías Comunitarias - Documentación Técnica
        </Heading>
        <p className="hero__subtitle">
          Bienvenido a la Documentación de todos los servicios de Software que
          ofrece Garantías comunitarias, puedes seleccionar en las pestañas de
          la parte superior el proyecto que desees explorar o utilizar la barra
          de busqueda en la parte superior derecha para buscar algun modulo,
          componente, funcion o tema en particular.
        </p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Garantías Comunitarias">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
