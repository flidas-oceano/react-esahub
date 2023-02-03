import React, { useEffect, useRef, useState } from "react";
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
  Label,
  Input,
} from "reactstrap";

import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import SimpleLoading from "components/Loading/SimpleLoading";

function EsahubSales() {
  const [hasRequest, setHasRequest] = useState(false);
  const [hasSpecialRequest, setHasSpecialRequest] = useState(false);
  const [option, setOption] = useState(false);
  const [preview, setPreview] = useState("");
  const selectRef = useRef();
  const selectYearRef = useRef();

  useEffect(() => {
    moment.locale("es", {
      months:
        "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
          "_"
        ),
      monthsShort:
        "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split("_"),
      weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split(
        "_"
      ),
      weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
      weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
    });

    setPreview(moment(option).format("YYYY/MM/01"));
  }, [hasRequest, hasSpecialRequest]);

  const handleLoading = (status, type) => {
    if (type === "special") {
      setHasSpecialRequest(status);
    } else {
      setHasRequest(status);
    }
  };

  const handleOption = (evt) => {
    console.log(evt.target.value);
    const optionValue =
      evt.target.value === "Seleccione una opcion" ? false : evt.target.value;
    setOption(optionValue);
    setPreview(evt.target.value);
  };

  const handleFetch = (evt, fromPeriod, fromRequest) => {
    console.log({ fromPeriod });

    handleLoading(true, fromRequest);

    const url = `https://www.oceanomedicina.net/laravel-foclis/api/esahub/ventas-por-pedido${
      fromPeriod && `?period=${fromPeriod}`
    }`;

    axios
      .get(url)
      .then((res) => {
        const { data } = res;
        console.log({ res, data });
        const message = `
            ¡Solicitud completa!
        `;

        handleToast(message, "success");
        handleLoading(false, fromRequest);
      })
      .catch((err) => {
        console.error({ err });
        const { status } = err.response;
        handleToast(
          status < 500
            ? "Error HTTP 524, vuelva a intentar por favor."
            : "Error distinto que 500, comunicarse con el sector de tecnologia.",
          "error"
        );
        handleLoading(false, fromRequest);
      });
  };

  const handleToast = (title, icon) => {
    Swal.fire({
      title,
      icon,
      /* toast: true, */
      animation: true,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      position: "center",
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  };

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
        </Row>
        <Row className="h-100 align-items-stretch">
          <Col lg="6" md="6" sm="12">
            <FormGroup>
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="12" xs="12">
                      <div className="numbers">
                        <p className="card-category">
                          Periodo ({moment().format("MMMM")})
                        </p>
                        <CardTitle tag="p">
                          {moment().format("01/MM/YYYY")} hasta{" "}
                          {moment()
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

                  {hasRequest ? (
                    <SimpleLoading />
                  ) : (
                    <Button
                      color="success"
                      style={{ marginLeft: "auto", display: "block" }}
                      disabled={hasRequest ? true : false}
                      onClick={(evt) =>
                        handleFetch(evt, moment().format("YYYYMM01"), "normal")
                      }
                    >
                      Solicitar
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </FormGroup>
          </Col>
          <Col lg="6" md="6" sm="12">
            <FormGroup>
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="12" xs="12">
                      <Label for="monthSelect">
                        Seleccione el periodo mensual{" "}
                        {option && "(" + moment(option).format("MMMM") + ")"}
                      </Label>
                      <Input
                        ref={selectRef}
                        type="select"
                        name="select"
                        id="monthSelect"
                        onChange={handleOption}
                      >
                        <option defaultValue>Seleccione una opcion</option>
                        <option value={moment("1/1/22").format("YYYYMM01")}>
                          Enero
                        </option>
                        <option value={moment("2/1/22").format("YYYYMM01")}>
                          Febrero
                        </option>
                        <option value={moment("3/1/22").format("YYYYMM01")}>
                          Marzo
                        </option>
                        <option value={moment("4/1/22").format("YYYYMM01")}>
                          Abril
                        </option>
                        <option value={moment("5/1/22").format("YYYYMM01")}>
                          Mayo
                        </option>
                        <option value={moment("6/1/22").format("YYYYMM01")}>
                          Junio
                        </option>
                        <option value={moment("7/1/22").format("YYYYMM01")}>
                          Julio
                        </option>
                        <option value={moment("8/1/22").format("YYYYMM01")}>
                          Agosto
                        </option>
                        <option value={moment("9/1/22").format("YYYYMM01")}>
                          Septiembre
                        </option>
                        <option value={moment("10/1/22").format("YYYYMM01")}>
                          Octubre
                        </option>
                        <option value={moment("11/1/22").format("YYYYMM01")}>
                          Noviembre
                        </option>
                        <option value={moment("12/1/22").format("YYYYMM01")}>
                          Diciembre
                        </option>
                      </Input>
                      <Input
                        ref={selectYearRef}
                        type="select"
                        name="select"
                        id="monthSelect"
                        onChange={handleOption}
                      >
                        <option defaultValue>Seleccione una año</option>
                        <option value={moment("1/1/22").format("YYYY")}>
                          2022
                        </option>
                        <option value={moment("2/1/22").format("YYYY")}>
                          2023
                        </option>
                      </Input>
                      {preview && option && (
                        <Col md="12" xs="12">
                          <div className="numbers">
                            <CardTitle tag="p">
                              {moment(preview).format("01/MM/YYYY") +
                                " hasta " +
                                moment(preview)
                                  .endOf("month")
                                  .format("DD/MM/YYYY")
                                  .toString()}
                            </CardTitle>
                          </div>
                        </Col>
                      )}
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />

                  {hasSpecialRequest ? (
                    <SimpleLoading />
                  ) : (
                    <Button
                      color="success"
                      style={{ marginLeft: "auto", display: "block" }}
                      disabled={!option ? true : false}
                      onClick={(evt) =>
                        handleFetch(
                          evt,
                          moment(preview).format("YYYYMMDD"),
                          "special"
                        )
                      }
                    >
                      Solicitar
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </FormGroup>
          </Col>
        </Row>
        <Row>
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
                      en ESAHUB se realizan cada sabado del mes
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
