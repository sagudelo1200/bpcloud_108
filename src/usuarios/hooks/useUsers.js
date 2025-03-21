import { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from 'firebaseApp'

// Carga los usuarios de la base de datos e indica si se está cargando o no
export const useUsers = (unidad) => {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      /* Filtar integrantes por unidad */
      const colRef = await collection(db, 'integrantes')
      const q = unidad ? query(colRef, where('unidad', '==', unidad)) : colRef

      const querySnapshot = await getDocs(q)
      let data = []
      querySnapshot.forEach((doc) => {
        const x = doc.data()
        x.id = doc.id
        x.nombreCompleto = `${x.nombres || ''} ${x.apellidos || ''}`.trim()
        data.push(x)
      })
      setUsuarios(data)
      setLoading(false)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [usuarios, loading]
}
