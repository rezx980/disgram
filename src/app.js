import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Users, Video, Settings, Globe, Heart, MessageCircle, Share, Plus } from 'lucide-react';

// Mock data for development
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
  { id: '1', content: 'Hello everyone!', author: 'user1', timestamp: new Date() },
  { id: '2', content: 'Hey there!', author: 'user2', timestamp: new Date() }
];

const mockReels = [
  {
    id: '1',
    video_url: 'https://example.com/video1.mp4',
    caption: 'Amazing gaming moment!',
    author: { username: 'gamer123', avatar: null },
    likes_count: 150,
    comments_count: 25,
    duration: 30
  },
  {
    id: '2',
    video_url: 'https://example.com/video2.mp4',
    caption: 'Check out this code!',
    author: { username: 'devmaster', avatar: null },
    likes_count: 89,
    comments_count: 12,
    duration: 45
  }
];

// Translation strings
const translations = {
  en: {
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
    welcome: 'Welcome to Discord Reels!'
  },
  ar: {
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
    welcome: 'مرحبًا بك في ديسكورد ريلز!'
  },
  fr: {
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
    welcome: 'Bienvenue sur Discord Reels!'
  },
  ru: {
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
    welcome: 'Добро пожаловать в Discord Reels!'
  }
};

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

const ReelItem = ({ reel, onLike, onComment, t }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const videoRef = useRef(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(reel.id, !isLiked);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="relative w-80 h-[90vh] rounded-2xl overflow-hidden bg-gray-900">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
          src={reel.video_url}
        />
        
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
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex flex-col items-center text-white"
          >
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

const ReelsFeed = ({ reels, onLike, onComment, t }) => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      setCurrentReelIndex(prev => Math.min(prev + 1, reels.length - 1));
    } else {
      setCurrentReelIndex(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <div 
      className="h-screen overflow-hidden bg-black relative"
      onWheel={handleScroll}
    >
      <div 
        className="flex flex-col transition-transform duration-300"
        style={{ transform: `translateY(-${currentReelIndex * 100}vh)` }}
      >
        {reels.map(reel => (
          <ReelItem
            key={reel.id}
            reel={reel}
            onLike={onLike}
            onComment={onComment}
            t={t}
          />
        ))}
      </div>
      
      <div className="absolute top-4 right-4 flex space-x-2 rtl:space-x-reverse">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 rtl:space-x-reverse">
          <Video className="w-4 h-4" />
          <span>{t('addReel')}</span>
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('chat'); // 'chat' or 'reels'
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentServer, setCurrentServer] = useState(mockServers[0]);
  const [currentChannel, setCurrentChannel] = useState(mockChannels[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [reels, setReels] = useState(mockReels);

  const t = (key) => translations[currentLanguage][key] || key;

  const handleSendMessage = (content) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      author: 'currentUser',
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

  const handleAddComment = (reelId, content) => {
    setReels(prev => prev.map(reel => 
      reel.id === reelId 
        ? { ...reel, comments_count: reel.comments_count + 1 }
        : reel
    ));
  };

  return (
    <div className="h-screen flex bg-gray-900" dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
      {/* Server Sidebar */}
      <ServerSidebar
        servers={mockServers}
        currentServer={currentServer}
        onServerSelect={setCurrentServer}
        t={t}
      />
      
      {/* Channels Sidebar */}
      {currentView === 'chat' && (
        <ChannelsSidebar
          channels={mockChannels}
          currentChannel={currentChannel}
          onChannelSelect={setCurrentChannel}
          t={t}
        />
      )}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
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
        
        {/* Content Area */}
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
              onComment={handleAddComment}
              t={t}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
