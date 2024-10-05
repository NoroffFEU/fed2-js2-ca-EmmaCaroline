import { createPost } from "../../api/post/create";

export async function onCreatePost(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const post = Object.fromEntries(formData.entries());

  // Set tags to an empty array if not provided
  post.tags = post.tags ? post.tags.split(",").map((tag) => tag.trim()) : []; // Split by comma and trim spaces

  if (post.media) {
    post.media = {
      url: post["media-url"],
      alt: post["media-alt"] || "No description provided",
    };
  }

  const response = await createPost(post);
  alert("Post created!");
  form.reset();
}
