import Song from "../models/song.model.js";

class PostsController {
    getPosts = async (req, res) => {
        const userSongs = await Song.find({});
        res.send(userSongs);
    }
}

export default new PostsController();
