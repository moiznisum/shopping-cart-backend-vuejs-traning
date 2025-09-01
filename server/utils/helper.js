
function handleUserDetails(user) {
    if (!user) {
        return {}
    }

    return {
        id: user._id,
        email: user.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        username: user?.username,
        phone: user?.phone,
        address: user?.address,
        city: user?.city,
        country: user?.country,
        postalCode: user?.postalCode,
        profilePicture: user?.profilePicture
    }
}

export {
    handleUserDetails
}