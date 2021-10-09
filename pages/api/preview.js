// import { getPage, getPost } from '../../lib/soruce/wordpress/api';

// export default async function handler(req, res) {
// 	//Check the secret matches the one set in the .env
// 	if (req.query.token !== process.env.PREVIEW_SECRET) {
// 		return res.status(400).json({ message: 'Invalid token' });
// 	}

// 	//Get the post data by slug
// 	let post = null;
// 	const postId = parseInt(req.query.id);
// 	if (req.query.post_type === 'page') {
// 		post = await getPage(postId, true);
// 	} else {
// 		post = await getPost(postId, true, 'DATABASE_ID');
// 	}

// 	//If failed throw an error
// 	if (!post || !post?.slug) {
// 		//res.status(400).json({ message: 'Invalid slug' });
// 	}

// 	//Set preview data
// 	res.setPreviewData({});

// 	//Redirect to the path to view
// 	res.redirect(post.slug);
// }
