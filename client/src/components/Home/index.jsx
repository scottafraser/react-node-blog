import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { Form } from "../../components/Article";
import queryString from "query-string";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);
      this.props.history.push("/");
    }
    const { onLoad } = this.props;
    axios("http://localhost:8000/api/articles").then(res => onLoad(res.data));
  }

  handleDelete(id) {
    const { onDelete } = this.props;

    return axios
      .delete(`http://localhost:8000/api/articles/${id}`)
      .then(() => onDelete(id));
  }

  handleEdit(article) {
    const { setEdit } = this.props;

    setEdit(article);
  }

  render() {
    const { articles } = this.props;

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">Thoughts and prayers</h1>
            <h3>Send your thoughts and prayers!!!</h3>
          </div>
          <div className="loginButton">
            <a href="http://localhost:8000/auth/google" class="button">
              <div>
                <span class="svgIcon t-popup-svg">
                  <svg
                    class="svgIcon-use"
                    width="25"
                    height="37"
                    viewBox="0 0 25 25"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <path
                        d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                        fill="#34A853"
                      />
                      <path
                        d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                        fill="#EA4335"
                      />
                    </g>
                  </svg>
                </span>
                <span class="button-label">Sign in with Google</span>
              </div>
            </a>
          </div>
          <Form />
        </div>
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            {articles.map(article => {
              console.log(article);
              return (
                <div className="card my-3">
                  <div
                    className="card-header"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <h2>{article.author}</h2>
                    {moment(new Date(article.createdAt)).fromNow()}
                  </div>

                  <div className="card-body">
                    <h1>{article.body}</h1>
                    {article.thoughtsAndPrayers ? (
                      <h3>
                        Has raised &nbsp;
                        {article.thoughtsAndPrayers}
                      </h3>
                    ) : (
                      ""
                    )}
                    <p className="mt-5 text-muted">
                      <b>{article.title}</b>{" "}
                      {moment(new Date(article.createdAt)).fromNow()}
                    </p>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <button
                        onClick={() => this.handleEdit(article)}
                        className="btn btn-primary mx-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.handleDelete(article._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>{" "}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.home.articles
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: "HOME_PAGE_LOADED", data }),
  onDelete: id => dispatch({ type: "DELETE_ARTICLE", id }),
  setEdit: article => dispatch({ type: "SET_EDIT", article })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
