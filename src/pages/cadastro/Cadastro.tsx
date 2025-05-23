import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Usuario from '../../models/Usuario'
import './Cadastro.css'
import { RotatingLines } from 'react-loader-spinner'
import { ToastAlerta } from '../../ utils/ToastAlerta'
import { cadastrarUsuario } from '../../service/Service'


function Cadastro() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: null,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    sexo: '',
    veiculo: null,
  })

  useEffect(() => {
    if (usuario.id !== 0 && usuario.id !== null) {
      retornar()
    }
  }, [usuario])

  function retornar() {
    navigate('/home')
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })

  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {

      setIsLoading(true)
      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
          ToastAlerta('Usuário cadastrado com sucesso!', "sucesso");
          
      } catch (error) {
        ToastAlerta('Erro ao cadastrar o usuário!', "erro")
      }
    } else {
      ToastAlerta('Dados do usuário inconsistentes! Verifique as informações do cadastro.', "erro")
      setUsuario({ ...usuario, senha: '' })
      setConfirmaSenha('')
    }

    setIsLoading(false)
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto mt-10">
      <h1 className="text-4xl text-center mb-8 text-[#6F2473] font-bold">
        Cadastrar Usuário
      </h1>

      <form className="w-11/12 md:w-1/2 flex flex-col gap-6 bg-white border border-[#EDEDED] rounded-2xl p-6 shadow-md" onSubmit={cadastrarNovoUsuario}>
        <div className="flex flex-col gap-4">
          <label htmlFor="nome" className="text-[#4B2142] font-semibold">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            value={usuario.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className="border-2 border-[#B57EDC] rounded p-2 focus:outline-[#6F2473]"
          />

          <label htmlFor="usuario" className="text-[#4B2142] font-semibold">
            Usuário
          </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuário"
            value={usuario.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className="border-2 border-[#B57EDC] rounded p-2 focus:outline-[#6F2473]"
          />

          <label htmlFor="foto" className="text-[#4B2142] font-semibold">
            Foto (URL)
          </label>
          <input
            type="text"
            id="foto"
            name="foto"
            placeholder="URL da foto"
            value={usuario.foto}
            // onChange={atualizarEstado}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className="border-2 border-[#B57EDC] rounded p-2 focus:outline-[#6F2473]"
          />

          <label htmlFor="sexo" className="text-[#4B2142] font-semibold">
            Sexo
          </label>
          <select
            id="sexo"
            name="sexo"
            value={usuario.sexo}
            // onChange={atualizarEstado}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className="border-2 border-[#B57EDC] rounded p-2 focus:outline-[#6F2473]"
            required
          >
            <option value="">Selecione o sexo</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino" disabled>Masculino (não permitido)</option>
            <option value="Outro" disabled>Outro (não permitido)</option>
          </select>

          <label htmlFor="senha" className="text-[#4B2142] font-semibold">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            value={usuario.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} className="border-2 border-[#B57EDC] rounded p-2 focus:outline-[#6F2473]"
          />

          <label htmlFor="confirmarSenha" className="text-[#4B2142] font-semibold">
            Confirmar Senha
          </label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirmar senha"
            value={confirmaSenha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)} className="border-2 border-[#B57EDC] rounded p-2 focus:outline-[#6F2473]"
          />
        </div>

        <div className="flex justify-around gap-4">
          <button
            type="reset"
            onClick={retornar}
            className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2 transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            
            className="rounded text-white bg-[#6F2473] hover:bg-[#4B2142] w-1/2 py-2 transition-all"
          >
            {isLoading ? <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
              <span>Cadastrar</span>
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default Cadastro
