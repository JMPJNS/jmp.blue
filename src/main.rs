// USE THESE TECHNOLOGIES:
// webserver: https://github.com/tokio-rs/axum
// templating engine: https://github.com/djc/askama
// js framework: https://github.com/alpinejs/alpine
// css framework: https://github.com/tailwindlabs/tailwindcss

use askama::Template;
use axum::{
    routing::{get, post},
    http::StatusCode,
    response::IntoResponse,
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use axum::response::Html;

#[tokio::main]
async fn main() {
    // initialize tracing
    tracing_subscriber::fmt::init();

    // build our application with a route
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", get(root))
        // `POST /users` goes to `create_user`
        .route("/users", post(create_user));

    // run our app with hyper
    // `axum::Server` is a re-export of `hyper::Server`
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    tracing::debug!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

#[derive(Template)] // this will generate the code...
#[template(path = "index.html")] // using the template in this path, relative
// to the `templates` dir in the crate root
struct IndexTemplate<'a> { // the name of the struct can be anything
name: &'a str, // the field name should match the variable name
    // in your template
}

// basic handler that responds with a static string
async fn root() -> Html<String> {
    let template = IndexTemplate { name: "General Kenobi" };
    Html(template.render().unwrap_or("404 not found".to_owned()))
}

async fn create_user(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(payload): Json<CreateUser>,
) -> impl IntoResponse {
    // insert your application logic here
    let user = User {
        id: 1337,
        username: payload.username,
    };

    // this will be converted into a JSON response
    // with a status code of `201 Created`
    (StatusCode::CREATED, Json(user))
}

// the input to our `create_user` handler
#[derive(Deserialize)]
struct CreateUser {
    username: String,
}

// the output to our `create_user` handler
#[derive(Serialize)]
struct User {
    id: u64,
    username: String,
}