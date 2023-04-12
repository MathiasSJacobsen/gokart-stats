import styled from "styled-components/macro";

const Information = () => {
  return (
    <Container>
      <h1>Informasjon</h1>
      <span>
        Bedriftsserien i go-kart arrangeres av Harald Huysman Karting (HHK) på
        Alnabru, og går i perioden februar til desember 2023. I denne perioden
        vil hvert lag kjøre 10 løp á 2 timer. For hvert løp må bedriften stille
        med minst 3 førere, men gjerne med flere. Løpene går altså i 2 timer
        sammenhengende, men med førerskifte. Det er krav til 7 fører bytter,
        slik at det blir totalt 8 stints. Bytte vinduene er som følger, i antall
        minutter som gjenstår i løpet:
      </span>
      <ul>
        <li>107-103 min</li>
        <li>92-88 min</li>
        <li>77-73 min</li>
        <li>62-58 min</li>
        <li>47-43 min</li>
        <li>32-28 min</li>
        <li>17-13 min</li>
      </ul>
      <h2>Oppsummering av de viktigste reglene</h2>
      <span>
        Igjennom hele løpet vil løpsledelsen bruke flag til å kommunisere med
        førerne på banen.
      </span>
      <ul>
        <li>
          {" "}
          Ved gult flagg og gult lys skal farten umiddelbart reduseres. Alle
          forbikjøringer er nå forbudt.
        </li>
        <li>Kjøring i pitlane skal skje i gangfart.</li>
        <li>
          Når du skal inn i pitlane for å bytte fører må du kjøre yttersving i
          siste sving og holde en arm i luften for å signalisere at du kommer
          til å senke farten.
        </li>
        <li>
          Ved førerbytte blir du sittende i karten til du får grønt lys fra HHK
          om at lader er koblet til. Når dette er gitt går du ut av karten, og
          frem til lagkamerat som skal ut i ny kart.{" "}
        </li>
        <li>
          Den som skal ut i ny kart må motta klapp på skulder fra den som kom
          inn i pit før man går ut til karten og setter seg i den.
        </li>
        <li>
          Ved blått flagg skal du ved neste mulighet slippe forbi karten bak
          deg. Når blått flagg er vinket spiller det ingen rolle om du nå
          er/blir raskere enn karten bak - avgjørelsen er tatt.
        </li>
        <li>
          Alle situasjoner der man er uenig i avgjørelser som blir tatt skal tas
          opp etter løpet. Forstyrrelse av løpsleder kan medføre
          diskvalifisering av laget.
        </li>
        <li>
          Alle sportslige advarsler og straffer følger laget, og ikke den
          enkelte fører.
        </li>
      </ul>
      <p onClick={() => alert("Har ikke lagt til fila ennå")}>
        Hele regmentet kan du lese her!
      </p>
    </Container>
  );
};

export default Information;

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  @media (min-width: 767px) {
    align-items: center;
    padding: 0 30%;
  }
`;
