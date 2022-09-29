//Created by: Byron Georgopoulos
//Created on: 29/09/2022
//Last Modified on: 29/09/2022

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';

class App extends React.Component {

    constructor (props)
    {
        super(props);

        this.state = {
          projects: [],

          addProjectModalBool: false,
          projectName: '',

          addTaskModalBool: false,
          projectIndex: 0,
          taskName: '',
          taskStatus: 'Active',
          taskDesc: '',

          editProjectIndex: null,
          editProjectName: '',

          currentProjectIndex: null,

          editTaskIndex: null,
          editTaskName: '',
          editTaskStatus: '',

          searchTerm: '',
          searchRes: [],
          searchResBool: false,
        };
    };

    componentDidMount = () => {
      let projects = JSON.parse(localStorage.getItem('projects'));
      if (projects)
      {
      this.setState({ projects: projects });
      }
    };

    openAddProjectModal = () => {
      this.setState({ addProjectModalBool: true });
    };

    closeAddProjectModal = () => {
       this.setState({ addProjectModalBool: false });
    };

    handleProjectName = (event) => {
      let projectName = event.target.value;
      this.setState({ projectName: projectName });
    };

    clickAddNewProject = () => {
      let projectName = this.state.projectName;
      //console.log(`in clickAddNewProject. projectName: ${projectName}`);
      let projects = this.state.projects;
      let projectsLength = projects.length;
      //console.log(`\nprojects: ${JSON.stringify(projects)}\nprojectsLength: ${projectsLength}`);
      projects.push({
        'id': projectsLength + 1,
        'name': projectName,
        'tasks': []
      });
      this.setState({ projects: projects, addProjectModalBool: false });
      localStorage.setItem('projects', JSON.stringify(projects));
    };

    openAddTaskModal = (index) => {
      this.setState({ addTaskModalBool: true, projectIndex: index });
    };

    closeAddTaskModal = () => {
      this.setState({ addTaskModalBool: false });
    };

    handleTaskName = (event) => {
      let taskName = event.target.value;
      this.setState({ taskName: taskName });
    };

    handleTaskStatus = (event) => {
      let taskStatus = event.target.value;
      this.setState({ taskStatus: taskStatus });
    };

    handleTaskDesc = (event) => {
      let taskDesc = event.target.value;
      this.setState({ taskDesc: taskDesc });
    };

    addTaskToProject = () => {
      let projectIndex = this.state.projectIndex
      let projects = this.state.projects;
      let project = projects[projectIndex];
      let tasksLength = project.tasks.length;
      let taskName = this.state.taskName;
      let taskDesc = this.state.taskDesc;
      let taskStatus = this.state.taskStatus;

      projects[projectIndex].tasks.push({
        'id': tasksLength+1,
        'name': taskName,
        'status': taskStatus,
        'desc': taskDesc,
        'children': []

      });
      this.setState({ projects: projects, addTaskModalBool: false });
      localStorage.setItem('projects', JSON.stringify(projects));

    };

    deleteProject = (index) => {
      let projects = this.state.projects;
      let projectsLength = projects.length-1;

      for (let i = index; i <= projectsLength; i++)
      {
          projects[i].id = projects[i].id - 1;
      }
      projects.splice(index, 1);
      this.setState({ projects: projects });
      localStorage.setItem('projects', JSON.stringify(projects));
    };

    editProject = (index) => {
      this.setState({ editProjectIndex: index });
    };

    handleEditProjectName = (event) => {
      let editProjectName = event.target.value;
      this.setState({ editProjectName: editProjectName });
    };

    saveNewProjectName = () => {
      let editProjectName = this.state.editProjectName;
      let projects = this.state.projects;
      let editProjectIndex = this.state.editProjectIndex;
      projects[editProjectIndex].name = editProjectName;
      this.setState({ projects: projects, editProjectIndex: null });
      localStorage.setItem('projects', JSON.stringify(projects));
    };

    currentProject = (index) => {
      this.setState({ currentProjectIndex: index });
    };

    editTask = (index) => {
      this.setState({ editTaskIndex: index });
    };

    handleEditTaskName = (event) => {
      let taskName = event.target.value;
      this.setState({ editTaskName: taskName });
    };

    handleEditTaskStatus = (event) => {
      let taskStatus = event.target.value;
      this.setState({ editTaskStatus: taskStatus });
    }

    clickSaveTask = () => {
      let currentProjectIndex = this.state.currentProjectIndex;
      let editTaskIndex = this.state.editTaskIndex;
      let projects = this.state.projects;
      let editTaskName = this.state.editTaskName;
      let editTaskStatus = this.state.editTaskStatus;
      projects[currentProjectIndex].tasks[editTaskIndex].name = editTaskName;
      projects[currentProjectIndex].tasks[editTaskIndex].status = editTaskStatus;
      this.setState({ projects: projects, currentProjectIndex: null, editTaskIndex: null });
      localStorage.setItem('projects', JSON.stringify(projects));
    };

    deleteTask = (index) => {
      let currentProjectIndex = this.state.currentProjectIndex;
      let projects = this.state.projects;
      projects[currentProjectIndex].tasks.splice(index, 1);
      this.setState({ projects: projects });
      localStorage.setItem('projects', JSON.stringify(projects));
    };

    handleSearch = (event) => {
      let searchTerm = event.target.value;
      this.setState({ searchTerm: searchTerm });
    };

    clickSearch = () => {
      let searchTerm = this.state.searchTerm;
      let projects = this.state.projects;
      let projectsLength = projects.length-1;
      let searchRes = [];

      for (let i = 0; i <= projectsLength; i++)
      {
        if (projects[i].name === searchTerm)
        {
          searchRes.push(projects[i])
        }

        let tasks = projects[i].tasks
        let tasksLength = projects[i].tasks.length-1;

        for (let j = 0; j <= tasksLength; j++)
        {
          if (tasks[j].name === searchTerm)
          {
            searchRes.push(projects[i])
          }
        }
      }

      console.log(`in clickSearch\nsearchRes: ${JSON.stringify(searchRes)}`);
      this.setState({ searchRes: searchRes, searchResBool: true });

    };

    backToProjects = () => {
      this.setState({ searchResBool: false });
    };

    render ()
    {
      
      let addProjectModalBool = this.state.addProjectModalBool;
      let projects = this.state.projects;
      console.log(`RENDER\nprojects: ${JSON.stringify(projects)}`);

      let editProjectIndex = this.state.editProjectIndex;
      
      let addProjectModal = (
            <div>
                <Modal show={addProjectModalBool} style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} centered animation size='md' >
                    <Modal.Body>
                      <div style={{ fontSize: '2rem' }} >
                        Add A Project
                      </div>
                      <hr></hr>
                      <Form>
                        <Form.Group>
                          <Form.Label style={{ textAlign: 'left', float: 'left', marginLeft: '50px' }} >Project Name</Form.Label>
                          <Form.Control onChange={this.handleProjectName} type='text' placeholder='e.g. Project 1' />
                        </Form.Group>
                      </Form>
                      <hr></hr>
                      <Button onClick={this.clickAddNewProject} variant='primary'>Add New Project</Button>
                      <Button onClick={this.closeAddProjectModal} variant='danger'>Close/Cancel</Button>
                    </Modal.Body>
                </Modal>
            </div>
        );

        let editTaskIndex = this.state.editTaskIndex;

        let mapProjects = projects.map((project, index) => {
          return (
                      <Accordion.Item eventKey={index} onClick={this.currentProject.bind(this, index)} >
                        <Accordion.Header>
                          <Container>
                            <Row>
                                <Col md={4} >
                                        {
                                          editProjectIndex === index &&
                                          <div>
                                              <Form.Control onChange={this.handleEditProjectName} type='text' defaultValue={project.name} />
                                          </div>
                                        }
                                        {
                                          editProjectIndex !== index &&
                                          <div style={{ fontSize: '1.5rem' }} >
                                              <b>{project.name}</b>
                                          </div>
                                        }
                                </Col>
                                <Col md={8} style={{ textAlign: 'right', float: 'right' }} >
                                              {
                                          editProjectIndex === index &&
                                          <div>
                                              <Button onClick={this.saveNewProjectName} variant='link' style={{ color: 'green' }} >Save</Button>
                                          </div>
                                      }
                                      {
                                          editProjectIndex !== index &&
                                          <div>
                                              <Button onClick={this.editProject.bind(this, index)} variant='link' >Edit Project</Button><Button onClick={this.openAddTaskModal.bind(this, index)} variant='link' >Add Task</Button><Button onClick={this.deleteProject.bind(this, index)} style={{ color: 'red' }} variant='link' >Delete</Button>
                                          </div>
                                      }
                                </Col>
                              </Row>
                          </Container>
                        </Accordion.Header>
                        <Accordion.Body>
                          {
                            project.tasks.map((task, index) => {
                                return (
                                  <div>
                                    <Accordion>
                                      <Accordion.Item eventKey={index} >
                                        <Accordion.Header>
                                          <Container>
                                            <Row>
                                              <Col md={8} >
                                                {
                                                  editTaskIndex === index &&
                                                  <div>
                                                    <Row>
                                                      <Col>
                                                       <Form.Control onChange={this.handleEditTaskName} defaultValue={task.name} />
                                                      </Col>
                                                      <Col>
                                                       <Form.Control onChange={this.handleEditTaskStatus} defaultValue={task.status} />
                                                      </Col>
                                                    </Row>
                                                  </div>
                                                }
                                                {
                                                  editTaskIndex !== index &&
                                                  <div>
                                                    {task.name} | {task.status}
                                                  </div>
                                                }
                                              </Col>
                                              <Col md={4} style={{ textAlign: 'right', float: 'right' }} >
                                                {
                                                  editTaskIndex === index &&
                                                  <div>
                                                    <Button onClick={this.clickSaveTask} style={{ color: 'green' }} variant='link' >Save</Button>
                                                  </div>
                                                }
                                                {
                                                  editTaskIndex !== index &&
                                                  <div>
                                                    <Button onClick={this.editTask.bind(this, index)} variant='link' >Edit Task</Button><Button onClick={this.deleteTask.bind(this, index)} style={{ color: 'red' }} variant='link' >Delete Task</Button>
                                                  </div>
                                                }
                                              </Col>
                                            </Row>
                                          </Container>
                                        </Accordion.Header>
                                        <Accordion.Body style={{ float: 'left', textAlign: 'left', paddingLeft: '2.5rem' }} >
                                          <b>{task.desc}</b>
                                        </Accordion.Body>
                                      </Accordion.Item>
                                    </Accordion>
                                  </div>
                                );
                            })
                          }
                        </Accordion.Body>
                      </Accordion.Item>
          );
        });

        let addTaskModalBool = this.state.addTaskModalBool;

        let addTaskModal = (
            <div>
                <Modal show={addTaskModalBool} style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} centered animation size='md' >
                    <Modal.Body>
                      <div style={{ fontSize: '2rem' }} >
                        Add A Task
                      </div>
                      <hr></hr>
                      <Form>
                        <Form.Group>
                          <Form.Label style={{ textAlign: 'left', float: 'left', marginLeft: '50px' }} >Task Name</Form.Label>
                          <Form.Control onChange={this.handleTaskName} type='text' placeholder='e.g. Task 1' />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label style={{ textAlign: 'left', float: 'left', marginLeft: '50px' }} >Task Status</Form.Label>
                          <Form.Control onChange={this.handleTaskStatus} type='text' placeholder='Active' defaultValue='Active' />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label style={{ textAlign: 'left', float: 'left', marginLeft: '50px' }} >Task Description</Form.Label>
                          <Form.Control onChange={this.handleTaskDesc} type='text' placeholder='e.g. Lorem Ipsum' />
                        </Form.Group>
                      </Form>
                      <hr></hr>
                      <Button onClick={this.addTaskToProject} variant='primary'>Add New Task</Button>
                      <Button onClick={this.closeAddTaskModal} variant='danger'>Close/Cancel</Button>
                    </Modal.Body>
                </Modal>
            </div>
        );

        let searchResBool = this.state.searchResBool;
        let searchRes = this.state.searchRes;

        let mapSearchRes = searchRes.map((project, index) => {
          return (
            <div>
        <Accordion.Item eventKey={index} onClick={this.currentProject.bind(this, index)} >
                        <Accordion.Header>
                          <Container>
                            <Row>
                                <Col md={4} >
                                        {
                                          editProjectIndex === index &&
                                          <div>
                                              <Form.Control onChange={this.handleEditProjectName} type='text' defaultValue={project.name} />
                                          </div>
                                        }
                                        {
                                          editProjectIndex !== index &&
                                          <div style={{ fontSize: '1.5rem' }} >
                                              <b>{project.name}</b>
                                          </div>
                                        }
                                </Col>
                                <Col md={8} style={{ textAlign: 'right', float: 'right' }} >
                                              {
                                          editProjectIndex === index &&
                                          <div>
                                              <Button onClick={this.saveNewProjectName} variant='link' style={{ color: 'green' }} >Save</Button>
                                          </div>
                                      }
                                      {
                                          editProjectIndex !== index &&
                                          <div>
                                              <Button onClick={this.editProject.bind(this, index)} variant='link' >Edit Project</Button><Button onClick={this.openAddTaskModal.bind(this, index)} variant='link' >Add Task</Button><Button onClick={this.deleteProject.bind(this, index)} style={{ color: 'red' }} variant='link' >Delete</Button>
                                          </div>
                                      }
                                </Col>
                              </Row>
                          </Container>
                        </Accordion.Header>
                        <Accordion.Body>
                          {
                            project.tasks.map((task, index) => {
                                return (
                                  <div>
                                    <Accordion>
                                      <Accordion.Item eventKey={index} >
                                        <Accordion.Header>
                                          <Container>
                                            <Row>
                                              <Col md={8} >
                                                {
                                                  editTaskIndex === index &&
                                                  <div>
                                                    <Row>
                                                      <Col>
                                                       <Form.Control onChange={this.handleEditTaskName} defaultValue={task.name} />
                                                      </Col>
                                                      <Col>
                                                       <Form.Control onChange={this.handleEditTaskStatus} defaultValue={task.status} />
                                                      </Col>
                                                    </Row>
                                                  </div>
                                                }
                                                {
                                                  editTaskIndex !== index &&
                                                  <div>
                                                    {task.name} | {task.status}
                                                  </div>
                                                }
                                              </Col>
                                              <Col md={4} style={{ textAlign: 'right', float: 'right' }} >
                                                {
                                                  editTaskIndex === index &&
                                                  <div>
                                                    <Button onClick={this.clickSaveTask} style={{ color: 'green' }} variant='link' >Save</Button>
                                                  </div>
                                                }
                                                {
                                                  editTaskIndex !== index &&
                                                  <div>
                                                    <Button onClick={this.editTask.bind(this, index)} variant='link' >Edit Task</Button><Button onClick={this.deleteTask.bind(this, index)} style={{ color: 'red' }} variant='link' >Delete Task</Button>
                                                  </div>
                                                }
                                              </Col>
                                            </Row>
                                          </Container>
                                        </Accordion.Header>
                                        <Accordion.Body style={{ float: 'left', textAlign: 'left', paddingLeft: '2.5rem' }} >
                                          <b>{task.desc}</b>
                                        </Accordion.Body>
                                      </Accordion.Item>
                                    </Accordion>
                                  </div>
                                );
                            })
                          }
                        </Accordion.Body>
                      </Accordion.Item>
            </div>
          );
        });
      
      return (
        <div style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
          {addProjectModal}
          {addTaskModal}
              <Navbar sticky='top' style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'ghostwhite', width: '60%' }} >
                <Container fluid>
                  <Row style={{ width: '100%' }} >
                    <Col>
                      <Button onClick={this.openAddProjectModal} variant='link'>+ Add New Project</Button>
                    </Col>
                    <Col >
                      <Form.Control onChange={this.handleSearch} placeholder='Search Projects' />
                    </Col>
                    <Col style={{ textAlign: 'left', float: 'left' }} >
                    <Button onClick={this.clickSearch} variant='link' >Search</Button>
                    </Col>
                  </Row>
                </Container>
              </Navbar>
          <br></br>
          {
            searchResBool &&
            <div>
              <div>Search Results</div>
              <Button onClick={this.backToProjects} variant='link' >Back To All Projects</Button>
               <Accordion style={{ width: '60%', float: 'center', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }} flush >
              {mapSearchRes}
               </Accordion>
            </div>
          }
          {
            !searchResBool &&
            <div>
            <Accordion style={{ width: '60%', float: 'center', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }} flush >
            {mapProjects}
            </Accordion>
            </div>
          }
        </div>
      );
    };
};

export default App;