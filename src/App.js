import React, {Component} from 'react'
import './App.css'
import Form from "./containers/Form";
//import ReactDOM from 'react-dom';



class App extends React.Component {
	render(){
    
		return(
      <div>
        <h1>Agile Board</h1>
				<AgileBoard />
        <Form />
      </div>
    );
	}
}

class AgileBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = ({
			isLoading: true,
			projects: [],
			draggedOverCol: 0,
		});
		this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
		this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
		this.columns = [
			{name: 'Backlog', stage: 1},
			{name: 'inProgress', stage: 2},
			{name: 'Done', stage: 3},
		];
	}

	componentDidMount() {
		this.setState({ projects: projectList, isLoading: false });
	}

	handleOnDragEnter(e, stageValue) {
		this.setState({ draggedOverCol: stageValue });
	}

	handleOnDragEnd(e, project) {
		const updatedProjects = this.state.projects.slice(0);
		updatedProjects.find((projectObject) => {return projectObject.name === project.name;}).project_stage = this.state.draggedOverCol;
		this.setState({ projects: updatedProjects });
	}

	render() {
		if (this.state.isLoading) {
			return (<h3>Loading...</h3>);
		}

		return  (
      <div>
				{this.columns.map((column) => {
					return (
						<List
							name={ column.name }
							stage={ column.stage }
							projects={ this.state.projects.filter((project) => {return parseInt(project.project_stage, 10) === column.stage;}) }
							onDragEnter={ this.handleOnDragEnter }
							onDragEnd={ this.handleOnDragEnd }
							key={ column.stage }
						/>
					);
				})}
      </div>
		);
	}
}


class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = ({ mouseIsHovering: false });
	}

	componentWillReceiveProps(nextProps) {
		this.state = ({ mouseIsHovering: false });
	}

	generateTickets() {
		return this.props.projects.slice(0).map((project) => {
			return (
				<Ticket
					project={project}
					key={project.name}
					onDragEnd={this.props.onDragEnd}
				/>
			);
		});
	}

	render() {
		const columnStyle = {
			'display': 'inline-block',
			'verticalAlign': 'top',
			'marginRight': '5px',
			'marginBottom': '15px',
			'paddingLeft': '5px',
			'paddingTop': '0px',
			'width': '280px',
			'textAlign': 'center',
      'backgroundColor': '#FE9438',
      'border-radius' : '1em',
		};
		return  (
      <div
				style={columnStyle}
				onDragEnter={(e) => {this.setState({ mouseIsHovering: true }); this.props.onDragEnter(e, this.props.stage);}}
				onDragExit={(e) => {this.setState({ mouseIsHovering: false });}}
			>
				<h4>{this.props.stage}. {this.props.name} ({this.props.projects.length})</h4>
				{this.generateTickets()}
				<br/>
      </div>);
	}
}

class Ticket extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: true,
		};
	}

	render() {
		const cardStyle = {
			'backgroundColor': '#22CDC7',
			'paddingLeft': '0px',
			'paddingTop': '5px',
			'paddingBottom': '5px',
			'marginLeft': '0px',
			'marginRight': '5px',
      'marginBottom': '5px',
      'border-radius' : '1em',
		};

		return (
			<div
				style={cardStyle}
				draggable={true}
				onDragEnd={(e) => {this.props.onDragEnd(e, this.props.project);}}
			>
				<div><h4>{this.props.project.name}</h4></div>
        <div><h5>{this.props.project.currentState}</h5></div>
				<div><strong>Description: </strong>{ this.props.project.description }<br/></div>
			
			</div>
		);
	}
}

/*
 * Projects to be displayed on Kanban Board
 */
let projectList = [
  {
    name: 'Mission 1',
    currentState: 'High',
    description: 'Socio deleto morte nunc rege urbem proscribi Romanum veneno classi. ',
    project_stage: 1
  },
  {
    name: 'Mission 2',
    currentState: 'High',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    project_stage: 1
  },
  {
    name: 'Mission 3',
    currentState: 'High',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    project_stage: 1
  },
  {
    name: 'Mission 4',
    currentState: 'High',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    project_stage: 2
  },
  {
    name: 'Mission 5',
    currentState: 'High',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    project_stage: 3
  },
  {
    name: 'Mission 6',
    currentState: 'High',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    project_stage: 3
  },
  {
    name: 'Mission 7',
    currentState: 'High',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    project_stage: 3
  },
];


//ReactDOM.render(<App />, document.getElementById('app'));

export default App