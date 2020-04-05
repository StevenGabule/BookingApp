import React, {Component} from 'react';
import axios from 'axios';


class Add extends Component {

    state = {
        name: '',
        short_description: '',
        long_description: '',
        category: '',
        avatar: '',
        imagePreviewUrl: false,
        loading: false,
    };

     handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const { name, short_description, long_description, category, avatar } = this.state;
        await axios.post('http://127.0.0.1:8000/Api/restaurants', {
            name,
            short_description,
            long_description,
            category,
            avatar
        }).then((res) => {
            this.props.history.push('/restaurants');
        }).catch((err) => console.table(err));
        this.setState({loading: false})
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    onFileChange = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            this.setState({
                imagePreviewUrl: false
            });
            return;
        }
        this.uploadImage(files[0]);
        this.setState({
            imagePreviewUrl: true
        });
    };

    uploadImage = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                avatar: e.target.result
            });
        };
        reader.readAsDataURL(file);
    };

    render() {
        const {imagePreviewUrl, loading, avatar } = this.state;
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className='h1 mt-3'>Register New Restaurant</h1>
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="inputName">Name</label>
                                <input type="text" className="form-control" id="inputName" name='name'
                                       onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="validationCustom04">Select Category Name</label>
                                <select className="custom-select" id="validationCustom04" required name='category'
                                        onChange={this.handleChange}>
                                    <option disabled value="">Choose...</option>
                                    <option value='option 1'>Option 1</option>
                                    <option value='option 2'>Option 2</option>
                                    <option value='option 3'>Option 3</option>
                                    <option value='option 4'>Option 4</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">Upload the avatar</label>
                                <input type="file" className="form-control-file" name='avatar' onChange={this.onFileChange}
                                       accept="image/x-png,image/gif,image/jpeg" id="exampleFormControlFile1"/>
                                { imagePreviewUrl ?  (
                                    <img className="img-fluid" alt="upload image not found" style={{width: '300px', height:'300px'}} src={avatar} />
                                    ) : ( 'Upload image' )
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputShortDescription">Short description</label>
                                <textarea className="form-control" name='short_description' id="inputShortDescription" rows="3"
                                          onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputFullDescription">Full description</label>
                                <textarea className="form-control" name='long_description' id="inputFullDescription"
                                          onChange={this.handleChange} rows="5"/>
                            </div>

                            <button type="submit" disabled={loading} className="btn btn-primary">Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Add;
