/*
  # Correção da URL do link de convite

  1. Problema Identificado
    - A função create_tracking_session estava usando URL hardcoded 'https://vigialink.com.br'
    - A URL correta do sistema é 'https://vigialink-o0nl.bolt.host'

  2. Alterações
    - Atualizar a função create_tracking_session para usar a URL correta
    - Corrigir linha que gera o invite_link

  3. Impacto
    - Todos os novos links de rastreamento gerados usarão a URL correta
    - Links antigos não são afetados (já foram enviados)
*/

-- Recriar função create_tracking_session com URL correta
CREATE OR REPLACE FUNCTION create_tracking_session(
  p_tracked_user_name TEXT,
  p_tracked_user_phone TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_profile profiles%ROWTYPE;
  active_sessions_count INTEGER;
  new_session tracking_sessions%ROWTYPE;
  invite_token TEXT;
  invite_link TEXT;
BEGIN
  -- Obter perfil do usuário
  SELECT * INTO user_profile 
  FROM profiles 
  WHERE id = auth.uid();
  
  IF user_profile.id IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Usuário não encontrado.'
    );
  END IF;

  -- Verificar se usuário está bloqueado
  IF user_profile.is_blocked THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Sua conta está bloqueada. Entre em contato com o suporte.'
    );
  END IF;

  -- Contar sessões ativas/pendentes do usuário
  SELECT COUNT(*) INTO active_sessions_count
  FROM tracking_sessions 
  WHERE admin_id = auth.uid() 
  AND status IN ('active', 'pending');

  -- Verificar limite de sessões
  IF active_sessions_count >= user_profile.allowed_sessions THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Limite de rastreamentos atingido. Você pode criar no máximo ' || user_profile.allowed_sessions || ' rastreamentos. Para adicionar mais, adquira um voucher adicional por R$ 9,90.',
      'current_sessions', active_sessions_count,
      'allowed_sessions', user_profile.allowed_sessions
    );
  END IF;

  -- Gerar token único
  invite_token := gen_random_uuid()::text;
  
  -- Criar sessão
  INSERT INTO tracking_sessions (
    admin_id,
    tracked_user_name,
    tracked_user_phone,
    invite_token,
    status
  ) VALUES (
    auth.uid(),
    p_tracked_user_name,
    p_tracked_user_phone,
    invite_token,
    'pending'
  ) RETURNING * INTO new_session;

  -- Gerar link de convite com URL CORRETA
  invite_link := 'https://vigialink-o0nl.bolt.host?token=' || invite_token;

  RETURN json_build_object(
    'success', true,
    'session_id', new_session.id,
    'invite_token', invite_token,
    'invite_link', invite_link,
    'tracked_user_name', p_tracked_user_name,
    'message', 'Sessão de rastreamento criada com sucesso!'
  );
END;
$$;
