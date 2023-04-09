import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: "1264px";
  margin: 0 auto;
  padding: var(--8) var(--4) var(--8);
  gap: var(--6);

  @media (max-width: "767px") {
    padding: var(--4) var(--2);
    gap: var(--3);
  }
`;

const ErrorMessageContainer = styled.div`
  gap: var(--1);
  font-family: var(--newzald-book);
  font-size: var(--18px-rem);
`;

const ErrorMessage = styled.h2`
  display: flex;
  justify-content: center;
`;

const Info = styled.p`
  font-size: var(--24px-rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

export const NotFoundPage = () => {
  return (
    <Container>
      <ErrorMessageContainer>
        <ErrorMessage>404</ErrorMessage>
        <Info>
          <span>Oisann, her var det tomt 🤔</span>
        </Info>
      </ErrorMessageContainer>
    </Container>
  );
};
