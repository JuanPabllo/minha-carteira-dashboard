import styled from 'styled-components';
/* 
LAYOUT:
MH: Main Header
AS: Aside
CT: Content
 */
export const Container = styled.div`
  display: grid;
  grid-template-columns: 250px auto; /*A primeira coluna 250px, auto: O tanto que  tiver disponivel*/
  grid-template-rows: 70px auto;

  grid-template-areas:
    'AS MH'
    'AS CT';
  height: 100vh; /*vh: view height*/
`;
