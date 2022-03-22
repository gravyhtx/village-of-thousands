export const createProduct = (productData) => {
  return fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData)
  })
}

export const resendConfirmationFetch = (user) => {
  console.log(user)
  return fetch('/api/users/activate/resend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user.data)
  })
}

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
}

export const createUser = (userData) => {
  return fetch('/api/users/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
}

export const getSingleUser = (token) => {
  return fetch('/api/users/single', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
};

export const getPendingUser = (userId) => {
  return fetch('/api/users/single/' + userId, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

export const updateUser = (userData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  })
}

export const accountActivation = (userId) => {
  return fetch('/api/users/activate/' + userId, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}