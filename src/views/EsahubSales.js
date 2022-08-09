import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Button,
} from "reactstrap";

import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import SimpleLoading from "components/Loading/SimpleLoading";

function EsahubSales() {

  const [preview, setPreview] = useState("");
  const [hasRequest, setHasRequest] = useState(false);

  useEffect(() => {
    moment.locale("es",{
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
        weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
      });

    setPreview(moment().format("YYYY/MM/01"))
  }, [hasRequest]);


  const handleLoding = (status) =>{
    setHasRequest(status);
  }

  const handleFetch = (evt, fromPeriod) => {
    console.log({fromPeriod})
    handleLoding(true)
    const url = `https://www.oceanomedicina.net/laravel-foclis/api/esahub/ventas-por-pedido${
      fromPeriod && `?period=${fromPeriod}`
    }`;

    axios.get(url)
      .then((res) => {
        console.log({ data: res.data });
        const { AppendResposeBody, UpdateResposeHeader, new_values } = res.data
        let message = `
            Solicitud completa!, nuevos datos que se sumaron al Sheet: ${new_values.length}
        `
        handleToast(message, "success")
        handleLoding(false)

      }).catch((err) => {
        console.error({ err });
        const { status } = err.response
        handleToast(status < 500 ? "Error HTTP 524, vuelva a intentar por favor." : "Error distinto que 500, comunicarse con el sector de tecnologia.", "error")
        handleLoding(false);
      });

  };

  const handleToast = (title, icon) =>{
    Swal.fire({
      title,
      icon,
      /* toast: true, */
      animation: true,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      position: 'center',
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="12" md="12" sm="12">
            <h1>Ventas por pedidos a ESAHUB</h1>
            <p>
              Esta aplicacion se conecta a la API de Laravel Foclis consultando
              los registros mediante un periodo de tiempo mensual.
            </p>
            <p>Por defecto solo puede solicitar datos en el mes actual</p>
          </Col>
          <Col lg="12" md="12" sm="12">
            <FormGroup>
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      
                    </Col>
                    
                      <Col md="8" xs="7">
                        <div className="numbers">
                          <p className="card-category">Periodo ({moment().format("MMMM")})</p>
                          <CardTitle tag="p">
                            {moment(preview).format("DD/MM/YYYY")} hasta{" "}
                            {moment(preview)
                              .endOf("month")
                              .format("DD/MM/YYYY")
                              .toString()}
                          </CardTitle>
                        </div>
                      </Col>
                    
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />

            { hasRequest ? <SimpleLoading /> : <Button
                                                  color="success"
                                                  style={{ marginLeft: "auto", display: "block" }}
                                                  disabled={ hasRequest ? true : false}
                                                  onClick={(evt) => handleFetch(evt, moment(preview).format("YYYYMMDD"))}
                                                >
                                                  Solicitar
                                                </Button>}
                  
                </CardFooter>
              </Card>
            </FormGroup>
          </Col>
          <Col lg="12" md="12" sm="12">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col>
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-alert-circle-i text-info" />
                    </div>
                  </Col>
                  <Col md="9" xs="12">
                    <p className="mt-2 mb-0">
                      Actualmente esta establecido que la consulta de las ventas
                      en ESAHUB se realizan a principio de mes
                    </p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EsahubSales;
