import { Box, Typography } from "@mui/material";

import Layout from "components/Layout/Layout";

const LegalNotice = () => {
  return (
    <Layout>
      <Box p={5}>
        <Typography variant="h3">Aviso legal</Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          De conformidad con la Ley 34/2002, de Servicios de la Sociedad de la
          Información y de Comercio Electrónico, le informamos que esta web es
          titularidad de:
        </Typography>
        <Typography variant="body1" fontWeight={300}>
          Identidad: Cordada Outdoor, SL (en adelante “EL TITULAR”)
        </Typography>
        <Typography variant="body1" fontWeight={300}>
          CIF: B44829927
        </Typography>
        <Typography variant="body1" fontWeight={300}>
          Domicilio: c. Miguel de Cervantes 35, 3-1
        </Typography>
        <Typography mt={5} variant="h5" fontWeight={300}>
          PROPIEDAD INTELECTUAL E INDUSTRIAL
        </Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          Los contenidos de este sitio, incluyendo los textos, imágenes y
          diseños gráficos, pertenecen a EL TITULAR, o a terceros que han
          autorizado su uso. EL TITULAR presenta estos contenidos con fines de
          información y promoción. EL TITULAR autoriza su utilización
          exclusivamente con estas finalidades. Cualquier utilización de estos
          diseños, imágenes o textos deberá citar expresamente su pertenencia a
          EL TITULAR, quien se reserva el derecho a iniciar las acciones legales
          oportunas para reparar los daños
        </Typography>
        <Typography mt={5} variant="h5" fontWeight={300}>
          EXCLUSIÓN DE RESPONSABILIDAD
        </Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          EL TITULAR actúa con la máxima diligencia posible para que los datos y
          la información que ofrece en su sitio web esté actualizada en tomo
          momento, si bien no garantiza ni se hace responsable de la exactitud y
          actualización de los contenidos del sitio web, reservándose el derecho
          a modificar dichos contenidos en cualquier momento. EL TITULAR tampoco
          será responsable de la información que se pueda obtener a través de
          enlaces incluidos en el sitio web. Las relaciones comerciales con los
          clientes se regirán por las Condiciones Generales que, en su caso, se
          establezcan por EL TITULAR en un documento específico a tal efecto, o
          por los pactos concretos que pudieran acordarse con los clientes.
        </Typography>
        <Typography mt={5} variant="h5" fontWeight={300}>
          CONDICIONES DE USO
        </Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          El uso de este sitio web implica la aceptación plena de los términos
          del presente aviso legal. Los posibles conflictos relativos a esta web
          se regirán exclusivamente por el derecho del Estado Español. Toda
          persona usuaria de la web, independientemente de la jurisdicción
          territorial desde la cual se produzca su acceso, acepta el
          cumplimiento y respeto de estas cláusulas con renuncia expresa a
          cualquier otro fuero que pudiera corresponderle, sin perjuicio de los
          derechos que legalmente correspondan al usuario, en caso de que este
          ostente la condición de consumidor.
        </Typography>
      </Box>
    </Layout>
  );
};

export default LegalNotice;
