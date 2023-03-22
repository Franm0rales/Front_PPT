import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Juego from '../components/Juego';

import './Home.css';

const Home: React.FC = () => {
  return (
    <><IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='header'>Piedra Papel Tijera</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Juego />
      </IonContent>
    </IonPage><Juego /></>
  );
};

export default Home;
