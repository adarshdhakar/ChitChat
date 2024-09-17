// src/app/page.js
import BoilerPlate from '../components/BoilerPlate';
import HomePage from '../components/HomePage';

export default async function Home() {
  
  return (
    <BoilerPlate>
      <HomePage />
    </BoilerPlate>
  );
}
