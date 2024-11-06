import { Box, Typography } from "@mui/material";

import Layout from "components/Layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Box p={5}>
        <Typography variant="h3">Política de privacidad</Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          EL TITULAR se compromete a proteger la privacidad de los usuarios que
          accedan a esta web y/o cualquiera de sus servicios. La utilización de
          la web y/o de cualquiera de los servicios ofrecidos por EL TITULAR
          implica la aceptación por el usuario de las disposiciones contenidas
          en la presente Política de Privacidad y que sus datos personales sean
          tratados según se estipula en ella. Por favor, tenga en cuenta que a
          pesar de que pueda haber enlaces de nuestra web a otras webs o redes
          sociales, esta Política de Privacidad no se aplica a las webs de otras
          compañías u organizaciones a las que la web esté redirigida. EL
          TITULAR no controla el contenido de las webs de terceros, ni acepta
          cualquier responsabilidad por el contenido o las políticas de
          privacidad de estas webs.
        </Typography>
        <Typography mt={5} variant="h5" fontWeight={300}>
          Información básica sobre el tratamiento de datos (Reglamento (UE)
          2016/679 y LO 3/2018)
        </Typography>
        <ul>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              <strong>Responsable del tratamiento: </strong>EL TITULAR. Nuestros
              datos figuran en el aviso legal de esta web.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              <strong>Finalidad del tratamiento: </strong>Ofrecer y gestionar
              nuestros productos i/o servicios.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              <strong>Legitimación: </strong>Consentimiento obtenido del
              interesado. Ejecución del contrato de servicios.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              <strong>Destinatarios: </strong>Los datos no serán comunicados a
              terceros, salvo que lo exija una Ley o sea necesario para cumplir
              con la finalidad del tratamiento.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              <strong>Derechos de las personas: </strong>Los interesados tienen
              derecho a ejercer los derechos de acceso, rectificación,
              limitación de tratamiento, supresión, portabilidad y oposición,
              enviando su solicitud a nuestra dirección.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              <strong>Plazo de conservación de los datos: </strong>Mientras se
              mantenga la relación comercial o durante los años necesarios para
              cumplir con las obligaciones legales.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              <strong>Reclamación: </strong>
            </Typography>
            Los interesados pueden dirigirse a la AEPD para presentar la
            reclamación que considere oportuna.
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              <strong>Información adicional: </strong>Puede consultar la
              información adicional y detallada a continuación en las “Preguntas
              sobre privacidad”.
            </Typography>
          </li>
        </ul>
        <Typography mt={5} variant="h5" fontWeight={300}>
          Preguntas sobre privacidad
        </Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y
          del Consejo, de 27 de abril de 2016, (RGPD), y la Ley Orgánica 3/2018,
          de 5 de diciembre, de Protección de Datos Personales y garantía de los
          derechos digitales (LOPDGDD le ofrecemos la siguiente información
          sobre el tratamiento de sus datos personales:
        </Typography>
        <Typography mt={5} variant="h6" fontWeight={300}>
          ¿Quién es el responsable del tratamiento de sus datos?
        </Typography>
        <Typography mt={1} variant="body1" fontWeight={300}>
          EL TITULAR.
          <br />
          Nuestros datos figuran en el aviso legal de esta web.
        </Typography>
        <Typography mt={5} variant="h6" fontWeight={300}>
          ¿Con qué finalidad tratamos sus datos personales?
        </Typography>
        <ul>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Tratamos la información que se nos facilita para prestar y
              facturar nuestros servicios y productos.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Si nos da su consentimiento también podremos tratar sus datos para
              enviarle información sobre nuestras actividades, servicios y
              productos.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Si participa en alguno de nuestros sorteos y/o concursos
              publicaremos su nombre y apellidos, y su imagen, en los diferentes
              espacios y medios de comunicación y difusión que utilizamos,
              incluidas las redes sociales, con el fin de promocionar nuestras
              actividades, servicios y productos.
            </Typography>
          </li>
        </ul>
        <Typography mt={5} variant="h6" fontWeight={300}>
          ¿Cuánto tiempo conservaremos sus datos?
        </Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          Los datos personales proporcionados se conservarán mientras sea
          usuario de nuestros servicios o quiera recibir información, y si
          participa en una promoción mientras esté activa, y luego, durante los
          plazos establecidos para cumplir con nuestras obligaciones legales.
        </Typography>
        <Typography mt={5} variant="h6" fontWeight={300}>
          ¿Cuál es la legitimación para el tratamiento de sus datos?
        </Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          La base legal para los tratamientos de sus datos son los
          consentimientos que nos da.
        </Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          Respecto a la información que nos sea enviada por menores de 14 años,
          se entenderá que lo ha sido con el consentimiento de sus
          representantes legales. Si no es así, el representante legal del menor
          nos lo tiene que comunicar tan pronto como tenga conocimiento.
        </Typography>
        <Typography mt={5} variant="h6" fontWeight={300}>
          ¿A qué destinatarios se comunicarán sus datos?
        </Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          Los datos no serán comunicados a terceros, salvo que lo exija una Ley
          o sea necesario para cumplir con la finalidad del tratamiento.
        </Typography>
        <Typography mt={5} variant="h6" fontWeight={300}>
          ¿Cuáles son sus derechos cuando nos facilita sus datos?
        </Typography>
        <ul>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Cualquier persona tiene derecho a obtener confirmación sobre si
              estamos tratando o no sus datos personales.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Los interesados tienen derecho a acceder a sus datos personales,
              así como a solicitar la rectificación de los datos inexactos o, en
              su caso, solicitar su supresión cuando, entre otros motivos, los
              datos ya no sean necesarios para las finalidades para las que se
              recogieron.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              En determinadas circunstancias los interesados podrán solicitar la
              limitación del tratamiento de sus datos, en este caso únicamente
              los conservaremos para el ejercicio o la defensa de reclamaciones.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              También, en determinadas circunstancias y por motivos relacionados
              con su situación particular, los interesados pueden oponerse al
              tratamiento de sus datos.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Los interesados también tienen derecho a la portabilidad de sus
              datos.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Finalmente, los interesados tienen derecho a presentar una
              reclamación ante la Autoridad de Control competente.
            </Typography>
          </li>
        </ul>
        <Typography mt={5} variant="h6" fontWeight={300}>
          ¿Cómo puede ejercer sus derechos?
        </Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          Enviando un escrito adjuntando una copia de un documento que lo
          identifique, a nuestra dirección física o electrónica.
        </Typography>
        <Typography mt={5} variant="h6" fontWeight={300}>
          ¿Cómo hemos obtenido sus datos?
        </Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          Los datos personales que tratamos proceden del propio interesado. El
          interesado garantiza que los datos personales facilitados son ciertos
          y se hace responsable de comunicar cualquier modificación de estos.
          Los datos que estén marcados con un asterisco serán obligatorios para
          poder darle el servicio solicitado.
        </Typography>
        <Typography mt={5} variant="h6" fontWeight={300}>
          ¿Qué datos tratamos?
        </Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          Las categorías de datos que podemos tratar en la prestación de
          nuestros servicios son:
        </Typography>
        <ul>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Datos de carácter identificativo
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Direcciones postales o electrónicas
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Otros datos solicitados en nuestros formularios
            </Typography>
          </li>
        </ul>
        <Typography mt={3} variant="body1" fontWeight={300}>
          Los datos son limitados, dado que únicamente tratamos los datos
          necesarios para la prestación de nuestros servicios y la gestión de
          nuestra actividad.
        </Typography>
        <Typography mt={5} variant="h6" fontWeight={300}>
          ¿Qué medidas de seguridad aplicamos?
        </Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          Aplicamos las medidas de seguridad establecidas en el artículo 32 del
          RGPD, por tanto, hemos adoptado las medidas de seguridad necesarias
          para garantizar un nivel de seguridad adecuado al riesgo del
          tratamiento de datos que realizamos, con mecanismos que nos permiten
          garantizar la confidencialidad, integridad, disponibilidad y
          resiliencia permanente de los sistemas y servicios de tratamiento.
        </Typography>
        <Typography mt={3} variant="body1" fontWeight={300}>
          Algunas de estas medidas son:
        </Typography>
        <ul>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Información de las políticas de tratamiento de datos al personal.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Realización de copias de seguridad periódicas.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Control de acceso a los datos.
            </Typography>
          </li>
          <li>
            <Typography mt={3} variant="body1" fontWeight={300}>
              Procesos de verificación, evaluación y valoración regulares.
            </Typography>
          </li>
        </ul>
      </Box>
    </Layout>
  );
};

export default PrivacyPolicy;
