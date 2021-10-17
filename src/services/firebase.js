import { firebase, FieldValue } from "../lib/firebase";

export async function doesUserNameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  profileDocId,
  userId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
}

export async function getFollowedUserPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const followedUserPhotos = await result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    followedUserPhotos.map(async (photo) => {
      let loggedInUserLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        loggedInUserLikedPhoto = true;
      }
      const [{ username }] = await getUserByUserId(photo.userId);

      return { username, ...photo, loggedInUserLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getUserPostsByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername)
    .where("following", "array-contains", profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  loggedInUserDocId,
  profileUserId,
  profileDocId,
  loggedInUserId
) {
  await updateLoggedInUserFollowing(
    loggedInUserDocId,
    profileUserId,
    isFollowingProfile
  );

  await updateFollowedUserFollowers(
    profileDocId,
    loggedInUserId,
    isFollowingProfile
  );
}

export async function deleteUserPost(postId) {
  await firebase.firestore().collection("photos").doc(postId).delete();
}

export async function updateUserPost(postId, post) {
  await firebase.firestore().collection("photos").doc(postId).update({
    caption: post,
    dateCreated: Date.now(),
  });
}
