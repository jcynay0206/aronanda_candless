import Hero from "../components/sections/Hero";
import Historia from "../components/sections/Historia";
import Colecciones from "../components/sections/Colecciones";
import Bestsellers from "../components/sections/Bestsellers";
import Eventos from "../components/sections/Eventos";
import Proceso from "../components/sections/Proceso";
import Resenas from "../components/sections/Resenas";
import InstagramFeed from "../components/sections/InstagramFeed";

export default function Home() {
  return (
    <>
      <Hero />
      <Historia />
      <Colecciones />
      <Bestsellers />
      <Eventos />
      <Proceso />
      <Resenas />
      <InstagramFeed />
    </>
  );
}
