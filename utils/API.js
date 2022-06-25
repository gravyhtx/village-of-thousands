export const createProduct = (productData) => {
  return fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData)
  })
}

export const getAllCategories = () => {
  return fetch('/api/products/category/', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

export const resendConfirmationFetch = (user) => {
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

export const updateUserWallet = (userData, token) => {
  return fetch('/api/users/wallet', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  })
}

export const deleteUserWallet = (userData, token) => {
  return fetch('/api/users/wallet', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  })
}

export const updateMainWallet = (userData, token) => {
  return fetch('/api/users/wallet/mainActiveWallet', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  })
}

export const updatePendingUser = (userData, token) => {
  return fetch('/api/users/pending', {
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

export const searchUserByEmail = (userEmail) => {
  return fetch('/api/users/' + userEmail, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export const updateAmount = (userData, token) => {
  return fetch('/api/checkout', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  })
}

export const createOrder = (orderData) => {
  return fetch('/api/checkout/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
}
//Demo Use Only Section


export const getDemoProducts = () => {
  return fetch('/api/demo/products/', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
};