import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { Modal, Button, Form, Table, Container, Card } from 'react-bootstrap';
import CsrfToken, { getCookie } from './CsrfToken';

const Echart = () => {
  const [status, setStatus] = useState('inactive');
  const [chartData, setChartData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [alarms, setAlarms] = useState([]);

  const handlesubmit = async (e) => {
    e.preventDefault();  
    try {
      const response = await fetch("http://127.0.0.1:8000/triggeralarm/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setChartData(data.chart_data);
      setAlarms(data.alarms);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const myChart = echarts.init(document.getElementById('echart'));

    const data = chartData.map(item => ({
      value: item.value,
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      itemStyle: { color: item.color }
    }));

    const option = {
      title: { text: '', left: 'center' },
      tooltip: { trigger: 'item' },
      series: [
        {
          name: 'Device Status',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
            formatter: [
              '{a|Device Status}',
              '{b|' + status.charAt(0).toUpperCase() + status.slice(1) + '}',
            ].join('\n'),
            rich: {
              a: { fontSize: 20, fontFamily: 'Sans-serif', color: '#000', lineHeight: 30 }
            }
          },
          emphasis: {
            label: { show: true, fontSize: '30', fontWeight: 'bold' }
          },
          labelLine: { show: false },
          data: data
        }
      ]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [chartData, status]);

  return (
    <Container>
      <Card className={`p-2 ${status === 'faulty' ? 'border-danger' : ''}`}>
        <Card.Title className="text-center">FCU-VAV</Card.Title>
        <div id="echart" style={{ width: '100%', height: '300px' }}></div>
        <Form onSubmit={handlesubmit} className="row row-cols-lg-auto g-3 align-items-center">
          <CsrfToken />
          <Form.Group className="col-12">
            <Form.Label htmlFor="status">Status</Form.Label>
          </Form.Group>
          <Form.Group className="col-12">
            <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="faulty">Fault</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="col-12">
            <Button type="submit" className="btn btn-primary">Trigger</Button>
          </Form.Group>
        </Form>
        <Button className="btn btn-info mt-3" onClick={() => setShowModal(true)}>View Details</Button>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>FCU-VAV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Status</th>
                <th>Dirty Filter Alarm</th>
                <th>Fan Speed</th>
                <th>SA Temperature</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {alarms.map((alarm, index) => (
                <tr key={index} className={`alarm-${alarm.Status}`}>
                  <td>{alarm.Equipment}</td>
                  <td>{alarm.Status}</td>
                  <td>{alarm.Dirty_Filter_Alarm}</td>
                  <td>{alarm.Fan_Speed}</td>
                  <td>{alarm.SA_Temperature}</td>
                  <td>{alarm.Last_Updated}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Echart;
