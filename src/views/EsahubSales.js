import React, { useEffect, useRef, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import axios from "axios";
import moment from "moment";

function EsahubSales() {
    const selectRef = useRef();
    const [option, setOption] = useState(0);
    const [preview, setPreview] = useState("");

    useEffect( () =>{
        moment.locale("es")
        console.log({option, preview})
    }, [option])

    const handleOption = evt => {
        setOption(evt.target.value)
        setPreview(evt.target.value)
    }

    const handleFetch = (evt) => {
        axios
            .get("https://www.oceanomedicina.net/laravel-foclis/api/hola")
            .then((res) => console.log(res));
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
          </Col>
          <Col lg="12" md="12" sm="12">
            <FormGroup>
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <Label for="monthSelect" >
                        Seleccione el periodo mensual
                      </Label>
                      <Input
                        ref={selectRef}
                        type="select"
                        name="select"
                        id="monthSelect"
                        onChange={ handleOption }
                      >
                        <option disabled defaultValue>
                          Seleccione una opcion
                        </option>
                        <option value={moment("1/1/22").format("L")}>
                          Enero
                        </option>
                        <option value={moment("2/1/22").format("L")}>
                          Febrero
                        </option>
                        <option value={moment("3/1/22").format("L")}>
                          Marzo
                        </option>
                        <option value={moment("4/1/22").format("L")}>
                          Abril
                        </option>
                        <option value={moment("5/1/22").format("L")}>
                          Mayo
                        </option>
                        <option value={moment("6/1/22").format("L")}>
                          Junio
                        </option>
                        <option value={moment("7/1/22").format("L")}>
                          Julio
                        </option>
                        <option value={moment("8/1/22").format("L")}>
                          Agosto
                        </option>
                        <option value={moment("9/1/22").format("L")}>
                          Septiembre
                        </option>
                        <option value={moment("10/1/22").format("L")}>
                          Octubre
                        </option>
                        <option value={moment("11/1/22").format("L")}>
                          Noviembre
                        </option>
                        <option value={moment("12/1/22").format("L")}>
                          Diciembre
                        </option>
                      </Input>
                    </Col>
                    
                    { 
                        preview !== "" ? 
                            <Col md="8" xs="7">
                            <div className="numbers">
                                <p className="card-category">Periodo</p>
                                <CardTitle tag="p">{moment(preview).format("DD/MM/YYYY")} hasta {moment(preview).endOf("month").format("DD/MM/YYYY").toString()}</CardTitle>
                            </div>
                            </Col>
                            :
                            null
                    }
                    
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  
                  <Button color="success" style={{ marginLeft: "auto", display: "block"}} onClick={ handleFetch }>Solicitar</Button>
                </CardFooter>
              </Card>
            </FormGroup>
          </Col>
          <Col lg="12" md="12" sm="12">
              <Card className="card-stats">
                <CardBody >
                    <Row>
                        <Col>
                        <div className="icon-big text-center icon-warning">
                            <i className="nc-icon nc-alert-circle-i text-info" />
                        </div>
                        </Col>
                        <Col md="9" xs="12">
                            <p className="mt-2 mb-0">Actualmente esta establecido que la consulta de las ventas en ESAHUB se realizan a principio de mes</p>
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
