export const createProduct = (productData) => {
  return fetch(process.env.URL + '/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData)
  })
}

export const loginUser = (userData) => {
  return fetch(process.env.URL + '/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
}

export const createUser = (userData) => {
  return fetch(process.env.URL + '/api/users/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
}

export const getSingleUser = (token) => {
  return fetch(process.env.URL + '/api/users/single', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
};

export const updateUser = (userData, token) => {
  return fetch(process.env.URL + '/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  })
}