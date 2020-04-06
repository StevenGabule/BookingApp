import React, {Component} from "react";
import axios from "axios";

class Edit extends Component {
    state = {
        name: "",
        short_description: "",
        long_description: "",
        category: "",
        avatar: "",
        image: "",
        imagePreviewUrl: true,
        loading: false,
    };

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/Api/restaurant/edit/${this.props.match.params.id}`)
            .then(({data}) => {
                this.setState({name: data.data.name});
                this.setState({short_description: data.data.short_description});
                this.setState({long_description: data.data.long_description});
                this.setState({category: data.data.category});
                this.setState({avatar: data.data.avatar});
                this.setState({image: data.data.image});
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const {name, short_description, long_description, category, image} = this.state;

        axios.post(`http://127.0.0.1:8000/Api/restaurant/update/${this.props.match.params.id}`, {
            name,
            short_description,
            long_description,
            category,
            image
        })
            .then((res) => {
                this.props.history.push("/restaurants");
            }).catch((err) => {
            console.error(err);
            this.setState({loading: false});
        });

    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onFileChange = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            this.setState({
                imagePreviewUrl: false,
            });
            return;
        }
        this.uploadImage(files[0]);
    };

    uploadImage = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                image: reader.result,
                avatar: reader.result,
            });
        };
        reader.readAsDataURL(file);
    };

    render() {
        const {imagePreviewUrl, loading, avatar, category, long_description, name, short_description} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="h1 mt-3">Edit Restaurant</h1>
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="inputName">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputName"
                                    name="name" value={name}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="validationCustom04">
                                    Select Category Name
                                </label>
                                <select
                                    className="custom-select"
                                    id="validationCustom04"
                                    required
                                    name="category" value={category}
                                    onChange={this.handleChange}
                                >
                                    <option disabled value="">
                                        Choose...
                                    </option>
                                    <option value="option 1">Option 1</option>
                                    <option value="option 2">Option 2</option>
                                    <option value="option 3">Option 3</option>
                                    <option value="option 4">Option 4</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">
                                    Upload the avatar
                                </label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    name="image"
                                    onChange={this.onFileChange}
                                    accept="image/x-png,image/gif,image/jpeg"
                                    id="exampleFormControlFile1"
                                />
                                {imagePreviewUrl ? (
                                    <img src={avatar} className="img-fluid" alt="upload image not found"
                                         style={{width: "300px", height: "300px"}}/>
                                ) : (
                                    "Upload image"
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputShortDescription">
                                    Short description
                                </label>
                                <textarea
                                    className="form-control"
                                    name="short_description"
                                    id="inputShortDescription"
                                    rows="3" value={short_description}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputFullDescription">
                                    Full description
                                </label>
                                <textarea
                                    className="form-control"
                                    name="long_description" value={long_description}
                                    id="inputFullDescription"
                                    onChange={this.handleChange}
                                    rows="5"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;
