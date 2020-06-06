import React , { Component } from 'react';
import {v4 as uuid} from 'uuid';
import axios from 'axios';

import Tags2 from '../Tags2';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: '',
            tags: [],
            completed: false, 
            createdAt: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/' + this.props.id)
            .then( res => {
                this.setState({
                    task: res.data.task,
                    tags: res.data.tags,
                    completed: res.data.completed,
                    createdAt: new Date()
                })
            })
            .catch( err => console.log(err));
    }

    onChangeTask= (e) => {
        this.setState({
            task: e.target.value
        });
    }

    onChangeTags = (e, i) => {
        const newTag = e.target.value;
        const updatedTags = this.state.tags.map((tag, i) => i === this.props.id ? {...tag, tag: newTag} : tag)
        this.setState({tags: updatedTags})
    }

    onChangeCompleted = () => {
        this.setState({
            completed: !this.state.completed
        });
    }

    onSubmit = (e) => {
        const obj = {  
            task: this.state.task,
            tags: this.state.tags,
            completed: this.state.completed,
            createdAt: this.state.createdAt
        };
        axios.post('http://localhost:4000/update/' + this.props.id, obj)
            .then( res => console.log(res.data))
            .catch(err => console.log(err.message, this.props.id));
    }

    render() {
        return (
            <div>
                <h3>Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Task: </label>
                        <input type="text" 
                                className="form-control"
                                value={this.state.task}
                                onChange={this.onChangeTask}
                                />
                    </div>
                   {/*  <div className="form-group">
                        <label>Tags: </label>
                        <input type="text" 
                            className="form-control"
                            value={this.state.tags.map(tag => tag.tag_text)}
                            onChange={(e) => this.onChangeTags(e.target.value.id, e.target.value)}
                            />
                    </div> */}
                    <Tags2 tags={this.props.tags} id={this.props.id}/>
                    <div>
                        <input  type="checkbox"
                                id="completedCheckbox"
                                name="completedCheckbox"
                                onChange={this.onChangeCompleted}
                                checked={this.state.completed}
                                value={this.state.completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}