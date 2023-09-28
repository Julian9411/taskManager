import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSkeletonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC, Ref, useEffect, useState } from "react";
import { getCountries } from "../../service/getCountries";

interface ICountries {
  dismissModal: () => void;
  setCountryName: (name: string) => void;
  ref: Ref<HTMLIonModalElement>
  isOpen: boolean
}

const LIMIT_RESULTS = 50;

export const Countries: FC<ICountries> = ({ dismissModal, setCountryName, ref, isOpen }) => {
  const [countries, setCountries] = useState<
    { flag: string; name: { common: string } }[]
  >([]);
  const [countriesRender, setCountriesRender] = useState<
    { flag: string; name: { common: string } }[]
  >([]);
  const [countryNameSearch, setCountryNameSearch] = useState("");
  const [numberResultsToRender, setNumberResultsToRender] = useState({
    initial: 0,
    limit: LIMIT_RESULTS,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCountries(setCountries);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setCountriesRender(
      countries.filter((country) =>
        country.name.common
          .toLocaleLowerCase()
          .includes(countryNameSearch.toLocaleLowerCase())
      )
    );
  }, [countryNameSearch]);
  useEffect(() => {
    setCountriesRender([
      ...countriesRender,
      ...countries.slice(
        numberResultsToRender.initial,
        numberResultsToRender.limit
      ),
    ]);
  }, [numberResultsToRender, countries]);

  const loadMoreCountries = () => {
    setNumberResultsToRender({
      initial: numberResultsToRender.limit,
      limit: numberResultsToRender.limit + LIMIT_RESULTS,
    });
  };

  return (
    <IonModal isOpen={isOpen} ref={ref} trigger="open-modal" onWillDismiss={dismissModal}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => dismissModal()}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Choose your country</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            type="text"
            label="find by country name"
            labelPlacement="floating"
            onIonChange={(e) => setCountryNameSearch(e.detail.value as string)}
          />
        </IonItem>
        <IonList>
          {isLoading ? (
            <>
              <IonItem>
                <IonThumbnail slot="start">
                  <IonSkeletonText animated={true}></IonSkeletonText>
                </IonThumbnail>
                <IonLabel>
                  <h3>
                    <IonSkeletonText
                      animated={true}
                      style={{ width: "80%" }}
                    ></IonSkeletonText>
                  </h3>
                  <p>
                    <IonSkeletonText
                      animated={true}
                      style={{ width: "60%" }}
                    ></IonSkeletonText>
                  </p>
                  <p>
                    <IonSkeletonText
                      animated={true}
                      style={{ width: "30%" }}
                    ></IonSkeletonText>
                  </p>
                </IonLabel>
              </IonItem>
            </>
          ) : (
            <>
              {countriesRender.map((item, index) => (
                <IonItem key={`${item?.flag}--${index}`}>
                  <IonLabel
                    onClick={() => {
                      dismissModal();
                      setCountryName(`${item?.flag} - ${item?.name.common}`);
                    }}
                  >
                    {item?.flag} {item?.name.common}
                  </IonLabel>
                </IonItem>
              ))}
            </>
          )}
        </IonList>
        <IonInfiniteScroll
          onIonInfinite={() => {
            loadMoreCountries();
          }}
        >
          <IonInfiniteScrollContent />
        </IonInfiniteScroll>
      </IonContent>
    </IonModal>
  );
};
