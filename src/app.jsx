import React, { useState } from 'react';
import { MessageSquare, Users, Video, Settings, Globe, Heart, MessageCircle, Share, Plus } from 'lucide-react';

// الترجمات
const translations = {
  en: {
    appName: 'Disgram',
    servers: 'Servers',
    channels: 'Channels',
    messages: 'Messages',
    reels: 'Reels',
    settings: 'Settings',
    language: 'Language',
    sendMessage: 'Send Message',
    typeMessage: 'Type a message...',
    like: 'Like',
    comment: 'Comment',
    share: 'Share',
    addReel: 'Add Reel',
    welcome: 'Welcome to Disgram!'
  },
  ar: {
    appName: 'ديسجرام',
    servers: 'الخوادم',
    channels: 'القنوات',
    messages: 'الرسائل',
    reels: 'الريلز',
    settings: 'الإعدادات',
    language: 'اللغة',
    sendMessage: 'إرسال رسالة',
    typeMessage: 'اكتب رسالة...',
    like: 'إعجاب',
    comment: 'تعليق',
    share: 'مشاركة',
    addReel: 'إضافة ريل',
    welcome: 'مرحبًا بك في ديسجرام!'
  },
  fr: {
    appName: 'Disgram',
    servers: 'Serveurs',
    channels: 'Canaux',
    messages: 'Messages',
    reels: 'Reels',
    settings: 'Paramètres',
    language: 'Langue',
    sendMessage: 'Envoyer le message',
    typeMessage: 'Tapez un message...',
    like: 'J\'aime',
    comment: 'Commentaire',
    share: 'Partager',
    addReel: 'Ajouter un reel',
    welcome: 'Bienvenue sur Disgram!'
  },
  ru: {
    appName: 'Дисграм',
    servers: 'Серверы',
    channels: 'Каналы',
    messages: 'Сообщения',
    reels: 'Rils',
    settings: 'Настройки',
    language: 'Язык',
    sendMessage: 'Отправить сообщение',
    typeMessage: 'Введите сообщение...',
    like: 'Нравится',
    comment: 'Комментарий',
    share: 'Поделиться',
    addReel: 'Добавить рил',
    welcome: 'Добро пожаловать в Дисграм!'
  }
};

// مبدل اللغة
const LanguageSwitcher = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <Globe className="w-4 h-4" />
      <select 
        value={currentLanguage} 
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-600"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// الشريط الجانبي للسيرفرات
const ServerSidebar = ({ servers, currentServer, onServerSelect, t }) => {
  return (
    <div className="w-16 bg-gray-900 flex flex-col items-center py-3 space-y-4">
      {servers.map(server => (
        <button
          key={server.id}
          onClick={() => onServerSelect(server)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
            currentServer?.id === server.id 
              ? 'bg-blue-600 rounded-2xl' 
              : 'bg-gray-700 hover:bg-gray-600 hover:rounded-2xl'
          }`}
        >
          <span className="text-lg">{server.icon}</span>
        </button>
      ))}
      <button className="w-12 h-12 rounded-2xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

// شريط القنوات
const ChannelsSidebar = ({ channels, currentChannel, onChannelSelect, t }) => {
  return (
    <div className="w-60 bg-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-white font-bold text-lg">{t('channels')}</h2>
      </div>
      <div className="flex-1 p-2 space-y-1">
        {channels.map(channel => (
          <button
            key={channel.id}
            onClick={() => onChannelSelect(channel)}
            className={`w-full text-left px-3 py-2 rounded transition-colors ${
              currentChannel?.id === channel.id
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {channel.type === 'text' ? <MessageSquare className="w-4 h-4" /> : <Users className="w-4 h-4" />}
              <span>#{channel.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// منطقة الدردشة
const ChatArea = ({ messages, currentChannel, onSendMessage, t, currentLanguage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-700">
      <div className="p-4 border-b border-gray-600">
        <h3 className="text-white font-semibold">
          #{currentChannel?.name || 'general'}
        </h3>
      </div>
      
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map(message => (
          <div key={message.id} className="text-white">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="font-semibold text-blue-400">{message.author}</span>
              <span className="text-gray-400 text-sm">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p className="mt-1">{message.content}</p>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-600">
        <div className="flex space-x-2 rtl:space-x-reverse">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('typeMessage')}
            className="flex-1 bg-gray-600 text-white px-4 py-2 rounded border border-gray-500 focus:outline-none focus:border-blue-500"
            dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {t('sendMessage')}
          </button>
        </div>
      </div>
    </div>
  );
};

// عنصر الريل
const ReelItem = ({ reel, onLike, onComment, t }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(reel.id, !isLiked);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="relative w-80 h-[90vh] rounded-2xl overflow-hidden bg-gray-900">
        <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-800 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-10 h-10" />
            </div>
            <p className="text-lg font-semibold">Reel Video</p>
            <p className="text-sm mt-2 opacity-80">{reel.caption}</p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="text-white">
            <h4 className="font-semibold">@{reel.author.username}</h4>
            <p className="text-sm mt-1">{reel.caption}</p>
          </div>
        </div>
        
        <div className="absolute right-4 bottom-20 space-y-4">
          <button
            onClick={handleLike}
            className="flex flex-col items-center text-white"
          >
            <Heart className={`w-8 h-8 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            <span className="text-sm">{reel.likes_count + (isLiked ? 1 : 0)}</span>
          </button>
          
          <button className="flex flex-col items-center text-white">
            <MessageCircle className="w-8 h-8" />
            <span className="text-sm">{reel.comments_count}</span>
          </button>
          
          <button className="flex flex-col items-center text-white">
            <Share className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

// صفحة الريلز
const ReelsFeed = ({ reels, onLike, onComment, t }) => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  return (
    <div className="h-screen overflow-hidden bg-black relative">
      <div className="h-full transition-transform duration-300">
        {reels.length > 0 && (
          <ReelItem
            reel={reels[currentReelIndex]}
            onLike={onLike}
            onComment={onComment}
            t={t}
          />
        )}
      </div>
      
      <div className="absolute top-4 right-4 flex space-x-2 rtl:space-x-reverse">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 rtl:space-x-reverse">
          <Video className="w-4 h-4" />
          <span>{t('addReel')}</span>
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {reels.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentReelIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentReelIndex ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// المكون الرئيسي
const App = () => {
  const [currentView, setCurrentView] = useState('chat');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentServer, setCurrentServer] = useState(null);
  const [currentChannel, setCurrentChannel] = useState(null);
  
  // بيانات تجريبية
  const mockServers = [
    { id: '1', name: 'Gaming Hub', icon: '🎮' },
    { id: '2', name: 'Dev Community', icon: '💻' },
    { id: '3', name: 'Music Lovers', icon: '🎵' }
  ];

  const mockChannels = [
    { id: '1', name: 'general', type: 'text' },
    { id: '2', name: 'gaming', type: 'text' },
    { id: '3', name: 'voice-chat', type: 'voice' }
  ];

  const mockMessages = [
    { id: '1', content: 'Hello everyone! 👋', author: 'user1', timestamp: new Date() },
    { id: '2', content: 'Welcome to Disgram! 🎉', author: 'user2', timestamp: new Date() },
    { id: '3', content: 'This is amazing! 😍', author: 'user3', timestamp: new Date() }
  ];

  const mockReels = [
    {
      id: '1',
      video_url: '',
      caption: 'Amazing gaming moment! 🎮',
      author: { username: 'gamer123', avatar: null },
      likes_count: 150,
      comments_count: 25,
      duration: 30
    },
    {
      id: '2',
      video_url: '',
      caption: 'Check out this code! 💻',
      author: { username: 'devmaster', avatar: null },
      likes_count: 89,
      comments_count: 12,
      duration: 45
    }
  ];

  const [messages, setMessages] = useState(mockMessages);
  const [reels, setReels] = useState(mockReels);

  const t = (key) => translations[currentLanguage][key] || key;

  const handleSendMessage = (content) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      author: 'You',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleLikeReel = (reelId, isLiked) => {
    setReels(prev => prev.map(reel => 
      reel.id === reelId 
        ? { 
            ...reel, 
            likes_count: isLiked ? reel.likes_count + 1 : Math.max(0, reel.likes_count - 1)
          }
        : reel
    ));
  };

  // تعيين السيرفر والقناة الافتراضية
  React.useEffect(() => {
    if (mockServers.length > 0 && !currentServer) {
      setCurrentServer(mockServers[0]);
    }
    if (mockChannels.length > 0 && !currentChannel) {
      setCurrentChannel(mockChannels[0]);
    }
  }, []);

  return (
    <div className="h-screen flex bg-gray-900" dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
      {/* الشريط الجانبي للسيرفرات */}
      <ServerSidebar
        servers={mockServers}
        currentServer={currentServer}
        onServerSelect={setCurrentServer}
        t={t}
      />
      
      {/* شريط القنوات */}
      {currentView === 'chat' && (
        <ChannelsSidebar
          channels={mockChannels}
          currentChannel={currentChannel}
          onChannelSelect={setCurrentChannel}
          t={t}
        />
      )}
      
      {/* المنطقة الرئيسية */}
      <div className="flex-1 flex flex-col">
        {/* شريط التنقل العلوي */}
        <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {/* شعار Disgram */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DG</span>
              </div>
              <h1 className="text-white font-bold text-xl">{t('appName')}</h1>
            </div>
            
            <button
              onClick={() => setCurrentView('chat')}
              className={`px-4 py-1 rounded transition-colors ${
                currentView === 'chat' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {t('messages')}
            </button>
            <button
              onClick={() => setCurrentView('reels')}
              className={`px-4 py-1 rounded transition-colors ${
                currentView === 'reels' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {t('reels')}
            </button>
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
            <button className="text-gray-300 hover:text-white">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* منطقة المحتوى */}
        <div className="flex-1">
          {currentView === 'chat' ? (
            <ChatArea
              messages={messages}
              currentChannel={currentChannel}
              onSendMessage={handleSendMessage}
              t={t}
              currentLanguage={currentLanguage}
            />
          ) : (
            <ReelsFeed
              reels={reels}
              onLike={handleLikeReel}
              onComment={() => {}}
              t={t}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
