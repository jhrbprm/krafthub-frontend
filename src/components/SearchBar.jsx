import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import JobsServiceAPI from "../api/services/Jobs/JobsService";
import { useForm } from "react-hook-form";
import AvailabilitiesServiceAPI from "../api/services/Availabilities/AvailabilitiesService";

const SearchBar = ({
  setAvailabilityResult = null
}) => {
  const [jobs, setJobs] = useState(null);
  const [jobTypes, setJobTypes] = useState(null);

  const { register, handleSubmit } = useForm();
  const onSearch = ({ userName, job, jobType }) => {
    AvailabilitiesServiceAPI.get({ userName, job, jobType }).then(({ results }) => {
      if (setAvailabilityResult !== null) {
        setAvailabilityResult(results);
      }
    })
  };

  const onJobSearch = (e) => {
    e.preventDefault();
    JobsServiceAPI.getByTypes(e.target.value).then(({ results }) => {
      setJobTypes(results);
    })
  }
  

  useEffect(() => {
    AvailabilitiesServiceAPI.get({}).then(({ results }) => {
      if (setAvailabilityResult !== null) {
        setAvailabilityResult(results);
      }
    })

    JobsServiceAPI.get().then(({ results }) => {
      setJobs(results);
    })
  }, [])
  
  return (
    <Form onSubmit={handleSubmit(onSearch)}>
      <Row>
        <Col>
          <input type="text" className="form-control" placeholder="Search Maker" {...register("userName")} />
        </Col>
        <Col>
          <select defaultValue="" className="form-select" {...register("job")} onChange={onJobSearch}>
            <option value="" disabled >Choose a Profession</option>
            {
              jobs && jobs.map((job, index) => {
                return <option key={`job-${index}`} value={job.id}>{job.title}</option>
              })
            }
          </select>
        </Col>
        <Col>
        <select defaultValue="" className="form-select" {...register("jobType")}>
            <option value="" disabled >Choose a Specialist</option>
            {
              jobTypes && jobTypes.map((job, index) => {
                return <option key={`jobtype-${index}`} value={job.id}>{job.title}</option>
              })
            }
          </select>
        </Col>
        {/* <Col>
          <Form.Select defaultValue="" placeholder="" >
            <option value="" disabled >Choose Time of availability</option>
          </Form.Select>
        </Col> */}

        <Col>
          <Button variant="primary" type="submit">
            <i className="fa fa-search"></i>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;