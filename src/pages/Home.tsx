import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Juego from '../components/ExploreContainer';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <><IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Piedra Papel Tijera</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage><Juego /></>
  );
};

export default Home;
